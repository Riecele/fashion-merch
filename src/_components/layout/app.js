import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import FeaturedProducts from "../Products/FeaturedProducts";
import ProductList from "../Products/ProductList";
import Cart from "../Cart/Cart";
import ProductModal from "../Products/ProductModal";
import Footer from "../Footer/Footer";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";
import OrderStatus from "../Orders/OrderStatus";
import AdminDashboard from "../Admin/AdminDashboard";
import LoadingSpinner from "../common/LoadingSpinner";
import LoginForm from "../LoginForm";
import { auth, db } from "../../config/firebaseConfig";
import { getProducts } from "../../services/firestoreService";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "../../store";
import { addToCart, removeFromCart } from "../../store/cartSlice";

const AppContent = () => {
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderHistory, setOrderHistory] = useState();
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [user, setUser] = useState(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Login form state (moved from Header.js)
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();


  const fetchProductsData = async () => {
    try {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProductsData();
  }, []);


  const getUserRole = async (email) => {
    try {

      const usersCollectionRef = collection(db, "users");
      const allUsersSnapshot = await getDocs(usersCollectionRef);
      console.log("All users in the database:");
      allUsersSnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });


      const q = query(usersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        console.log("No user found with this email");
        return { role: "customer" }; 
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      return { role: "customer" }; 
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = await getUserRole(currentUser.email);
        const updatedUser = {
          ...currentUser,
          role: userData?.role || "customer"
        };
        setUser(updatedUser);
      } else {
        setUser(null);
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    // Find the current item
    const item = cart.find(item => item.id === productId);
    if (item) {

      dispatch(removeFromCart(productId));

      dispatch(addToCart({...item, quantity}));
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };



  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const proceedToCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = await getUserRole(email);

      setUser({
        ...userCredential.user,
        role: userData?.role || "customer"
      });
    } catch (error) {
      console.error(error);
      alert("Login failed: " + error.message);
    }
  };

  const handleSignup = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: username
      });
      await setDoc(doc(db, "users", email), {
        email: email,
        displayName: username,
        role: "customer",
        createdAt: new Date()
      });
      setUser({
        ...userCredential.user,
        role: "customer"
      });
      alert("Account created successfully!");
    } catch (error) {
      console.error(error);
      alert("Signup failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderHistoryToggle = (value) => {
    console.log("Toggling order history to:", value);
    setOrderHistory(value);
    if (value) {
      setShowCart(false);
      setShowCheckout(false);
      setCurrentOrderId(null);
      setShowAdminDashboard(false);
    }
  };

  const toggleAdminDashboard = () => {
    setShowAdminDashboard(!showAdminDashboard);
    if (!showAdminDashboard) {
      setShowCart(false);
      setShowCheckout(false);
      setOrderHistory(false);
      setCurrentOrderId(null);
    }
  };

  // Function to show notification (moved from Header.js)
  const showNotificationMessage = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);

    // Hide notification after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleLocalLogin = async (e) => {
    if (e) e.preventDefault();
    setIsAuthLoading(true);
    try {
      await handleLogin(email, password);
      setShowLoginForm(false);
      setEmail("");
      setPassword("");
      showNotificationMessage("Successfully signed in!");
    } catch (error) {
      showNotificationMessage(
        error.message || "Login failed. Please try again.",
        "error"
      );
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLocalSignup = async (e) => {
    if (e) e.preventDefault();
    setIsAuthLoading(true);
    try {
      await handleSignup(email, password, username);
      setShowLoginForm(false);
      setEmail("");
      setPassword("");
      setUsername("");
      showNotificationMessage(
        `Welcome, ${username}! Your account has been created.`
      );
    } catch (error) {
      console.error("Error during signup:", error);
      showNotificationMessage(
        error.message || "Signup failed. Please try again.",
        "error"
      );
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Notification styles
  const notificationStyles = {
    container: {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "15px 25px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      color: "#fff",
      zIndex: 2000,
      animation: "slideIn 0.3s ease forwards",
      opacity: 0,
      transform: "translateX(30px)",
      maxWidth: "300px"
    },
    success: {
      backgroundColor: "rgba(76, 175, 80, 0.9)",
      border: "1px solid #43a047"
    },
    error: {
      backgroundColor: "rgba(211, 47, 47, 0.9)",
      border: "1px solid #c62828"
    },
    message: {
      margin: "0",
      fontSize: "16px"
    }
  };

  // Inject keyframes into document head
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideIn {
        0% { opacity: 0; transform: translateX(30px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.app}>
      <Header
        cartItemCount={cartItemCount}
        setShowCart={setShowCart}
        showCart={showCart}
        setShowOrderHistory={handleOrderHistoryToggle}
        showOrderHistory={showOrderHistory}
        user={user}
        handleLogin={handleLocalLogin}
        handleLogout={handleLogout}
        handleSignup={handleLocalSignup}
        toggleAdminDashboard={toggleAdminDashboard}
        showAdminDashboard={showAdminDashboard}
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
        isAuthLoading={isAuthLoading}
      />

      {/* Add LoginForm component that shows when showLoginForm is true */}
      {showLoginForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1200
          }}
        >
          <div
            style={{
              backgroundColor: '#2c2c2c',
              padding: '30px',
              borderRadius: '10px',
              width: '90%',
              maxWidth: '400px',
              position: 'relative'
            }}
          >
            <button 
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: '#fff',
                cursor: 'pointer'
              }}
              onClick={() => setShowLoginForm(false)}
            >
              ×
            </button>
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLocalLogin}
              handleSignup={handleLocalSignup}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              username={username}
              setUsername={setUsername}
              isLoading={isAuthLoading}
            />
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSpinner size="large" fullScreen={true} />
      ) : showAdminDashboard && user && user.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <>
          {!showOrderHistory && (
            <>
            <Hero />
              <FeaturedProducts
                products={products.slice(0, 3)}
                addToCart={handleAddToCart}
                styles={styles}
              />

              <ProductList
                products={products}
                addToCart={handleAddToCart}
                setSelectedProduct={setSelectedProduct}
                styles={styles}
              />
            </>
          )}

          <Cart
            cart={cart}
            showCart={showCart}
            setShowCart={setShowCart}
            removeFromCart={handleRemoveFromCart}
            updateQuantity={updateQuantity}
            getTotalPrice={getTotalPrice}
            proceedToCheckout={proceedToCheckout}
            styles={styles}
          />

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              addToCart={handleAddToCart}
              styles={styles}
            />
          )}

          {showCheckout && (
            <Checkout
              cart={cart}
              total={getTotalPrice()}
              getTotalPrice={getTotalPrice} 
              setShowCheckout={setShowCheckout}
              styles={styles}
              isLoggedIn={!!user}
              setShowLoginForm={setShowLoginForm}
              isAuthLoading={isAuthLoading}
            />
          )}

          {showOrderHistory && (
            <Orders setShowOrderHistory={setOrderHistory} />
          )}

          {currentOrderId && (
            <OrderStatus
          
            
              styles={styles}
            />
          )}
        </>
      )}

      {/* Notification component */}
      {showNotification && (
        <div
          style={{
            ...notificationStyles.container,
            ...(notificationType === "success"
              ? notificationStyles.success
              : notificationStyles.error),
            animation: showNotification
              ? "slideIn 0.3s ease forwards"
              : "fadeOut 0.3s ease forwards"
          }}
        >
          <p style={notificationStyles.message}>{notificationMessage}</p>
        </div>
      )}

      <Footer styles={styles} />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#121212",
    color: "#ffffff",
    lineHeight: "1.6",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },

 
};

export default App;
