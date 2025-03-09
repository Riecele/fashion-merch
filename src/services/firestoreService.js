import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  arrayUnion,
  deleteDoc
} from 'firebase/firestore';
import { firebaseApp } from '../config/firebaseConfig';

const db = getFirestore(firebaseApp);

// Add a new order to Firestore
export const addOrder = async (orderData) => {
  try {
    const orderRef = await addDoc(collection(db, "orders"), orderData);
    
    // If user is logged in, update their profile with order reference
    if (orderData.userId && orderData.userId !== 'anonymous') {
      await updateDoc(doc(db, "users", orderData.userId), {
        orderHistory: arrayUnion(orderRef.id)
      });
    }
    
    return orderRef.id;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

// Get orders for a specific user
export const getUserOrders = async (userId) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting user orders:", error);
    throw error;
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    return {
      id: docRef.id,
      ...productData
    };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, productData);
    return {
      id: productId,
      ...productData
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    return productId;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
