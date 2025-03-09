import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatting';
import { addOrder } from '../../services/firestoreService';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import { getAuth } from 'firebase/auth';
import LoadingSpinner from '../common/LoadingSpinner';

// Define all styles in a single object
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1100
  },
  checkoutContainer: {
    backgroundColor: '#2c2c2c',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative'
  },
  title: {
    fontSize: '1.5rem', 
    marginBottom: '20px'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#fff',
    cursor: 'pointer'
  },
  orderSummary: {
    marginBottom: '25px', 
    padding: '15px', 
    backgroundColor: '#333', 
    borderRadius: '8px'
  },
  sectionTitle: {
    marginBottom: '15px'
  },
  orderItem: {
    display: 'flex', 
    marginBottom: '10px'
  },
  orderItemImage: {
    width: '40px', 
    height: '40px', 
    borderRadius: '50%', 
    marginRight: '10px'
  },
  itemName: {
    margin: 0
  },
  itemPrice: {
    margin: 0
  },
  totalRow: {
    display: 'flex', 
    justifyContent: 'space-between', 
    marginTop: '15px'
  },
  formSection: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'flex', 
    gap: '15px', 
    marginBottom: '15px'
  },
  formColumn: {
    flex: 1
  },
  label: {
    display: 'block', 
    marginBottom: '5px'
  },
  input: {
    width: '100%', 
    padding: '10px', 
    borderRadius: '5px', 
    border: '1px solid #ccc'
  },
  buttonContainer: {
    display: 'flex', 
    justifyContent: 'space-between', 
    marginTop: '20px', 
    gap: '15px'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    color: '#ffffff',
    border: 'none',
    padding: '12px 0',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  orderButton: {
    flex: 2,
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    padding: '12px 0',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  loginContainer: {
    textAlign: 'center', 
    padding: '20px'
  },
  loginTitle: {
    marginBottom: '15px', 
    color: '#f8d7da'
  },
  loginText: {
    marginBottom: '25px', 
    color: '#ddd'
  },
  loginButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '12px 25px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold'
  }
};

const Checkout = ({ 
  cart, 
  total, 
  setShowCheckout, 
  isLoggedIn,
  setShowLoginForm,
  isAuthLoading
}) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customer: {
      name: '',
      email: '',
    },
    address: {
      street: '',
      city: '',
      zipCode: '',
    },
    payment: {
      cardNumber: '',
      cardExpiry: '',
      cardCVC: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    

    if (['name', 'email'].includes(name)) {
      setFormData({
        ...formData,
        customer: {
          ...formData.customer,
          [name]: value
        }
      });
    } else if (['street', 'city', 'zipCode'].includes(name)) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else if (['cardNumber', 'cardExpiry', 'cardCVC'].includes(name)) {
      setFormData({
        ...formData,
        payment: {
          ...formData.payment,
          [name]: value
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      // Create order object
      const orderData = {
        userId: auth.currentUser.uid,
        customerEmail: auth.currentUser.email,
        items: [...cart],
        subtotal: parseFloat(total),
        shippingCost: 5.99,
        total: parseFloat(total) + 5.99,
        shippingDetails: {
          fullName: formData.customer.name,
          email: formData.customer.email,
          address: formData.address.street,
          city: formData.address.city,
          zipCode: formData.address.zipCode,
          paymentMethod: 'Credit Card'
        },
        date: new Date(),
        status: 'processing'
      };
      
      // Save order to Firestore
      const orderId = await addOrder(orderData);
      
      // Clear the cart after successful order
      dispatch(clearCart());
      setIsSubmitting(false);
      setShowCheckout(false);
      
      alert(`Order placed successfully! Order ID: ${orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
      setIsSubmitting(false);
    }
  };

  const orderTotal = total;

  return (
    <div style={styles.overlay}>
      {isSubmitting ? (
        <LoadingSpinner size="large" fullScreen={true} />
      ) : (
        <div style={styles.checkoutContainer}>
          <h2 style={styles.title}>Checkout</h2>
          <button 
            style={styles.closeButton}
            onClick={() => setShowCheckout(false)}
          >
            ×
          </button>

          {isLoggedIn ? (
            <>
              <div style={styles.orderSummary}>
                <h3 style={styles.sectionTitle}>Order Summary</h3>
                <div>
                  {cart.map(item => (
                    <div key={item.id} style={styles.orderItem}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={styles.orderItemImage} 
                      />
                      <div>
                        <h4 style={styles.itemName}>{item.name}</h4>
                        <p style={styles.itemPrice}>{formatCurrency(item.price)} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={styles.totalRow}>
                  <span>Total:</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={styles.formSection}>
                  <h3 style={styles.sectionTitle}>Shipping Information</h3>
                  <div style={styles.formRow}>
                    <div style={styles.formColumn}>
                      <label style={styles.label} htmlFor="name">Full Name</label>
                      <input
                        style={styles.input}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.customer.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div style={styles.formColumn}>
                      <label style={styles.label} htmlFor="email">Email</label>
                      <input
                        style={styles.input}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.customer.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div style={styles.formRow}>
                    <label style={styles.label} htmlFor="street">Address</label>
                    <input
                      style={styles.input}
                      type="text"
                      id="street"
                      name="street"
                      value={formData.address.street}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formColumn}>
                      <label style={styles.label} htmlFor="city">City</label>
                      <input
                        style={styles.input}
                        type="text"
                        id="city"
                        name="city"
                        value={formData.address.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div style={styles.formColumn}>
                      <label style={styles.label} htmlFor="zipCode">ZIP Code</label>
                      <input
                        style={styles.input}
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.formSection}>
                  <h3 style={styles.sectionTitle}>Payment Information</h3>
                  <div style={styles.formRow}>
                    <label style={styles.label} htmlFor="cardNumber">Card Number</label>
                    <input
                      style={styles.input}
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.payment.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formColumn}>
                      <label style={styles.label} htmlFor="cardExpiry">Expiry Date</label>
                      <input
                        style={styles.input}
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.payment.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    
                    <div style={styles.formColumn}>
                      <label style={styles.label} htmlFor="cardCVC">CVC</label>
                      <input
                        style={styles.input}
                        type="text"
                        id="cardCVC"
                        name="cardCVC"
                        value={formData.payment.cardCVC}
                        onChange={handleChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.buttonContainer}>
                  <button 
                    type="button" 
                    style={styles.cancelButton}
                    onClick={() => setShowCheckout(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={styles.orderButton}
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div style={styles.loginContainer}>
              <h3 style={styles.loginTitle}>Sign In Required</h3>
              <p style={styles.loginText}>
                Please sign in or create an account to complete your purchase.
              </p>
              <button 
                onClick={() => {
                  setShowCheckout(false);
                  setShowLoginForm(true);
                }}
                style={styles.loginButton}
              >
                Sign In / Create Account
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
