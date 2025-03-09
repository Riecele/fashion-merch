import React, { useEffect } from 'react';
import { formatCurrency } from '../../utils/formatting';
import { useDispatch } from 'react-redux';
import { addQuantity, decreaseQuantity, clearCart } from '../../store/cartSlice';

const Cart = ({ cart, showCart, setShowCart, getTotalPrice, proceedToCheckout }) => {
  const dispatch = useDispatch();
  const localStyles = {
    cartPanel: {
      position: 'fixed',
      top: '0',
      right: '-100%',
      width: '90%',
      maxWidth: '400px',
      margin: '0 auto',
      height: '100%',
      backgroundColor: '#1f1f1f',
      transition: 'right 0.3s ease',
      zIndex: '1000',
      boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '5px',
    },
    showCartPanel: {
      right: '0',
    },
    cartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      borderBottom: '1px solid #333',
    },
    closeBtn: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ffffff',
      fontSize: '1.5rem',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      padding: '5px 10px',
      borderRadius: '4px',
      '&:hover': {
        color: '#ff6b6b',
      }
    },
    cartItems: {
      padding: '20px',
      overflowY: 'hidden',
      flex: '1',
    },
    cartItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#2c2c2c',
      flexWrap: 'wrap',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    cartItemImage: {
      width: '60px',
      height: '60px',
      borderRadius: '5px',
      objectFit: 'cover',
    },
    itemInfo: {
      marginLeft: '15px',
      flex: '1',
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 0',
    },
    quantityBtn: {
      backgroundColor: '#3a3a3a',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      width: '30px',
      height: '30px',
      fontSize: '16px',
      cursor: 'pointer',
      margin: '0 5px',
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: '#4a4a4a',
      }
    },
    quantityValue: {
      margin: '0 10px',
      fontWeight: 'bold',
    },
    removeBtn: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ff6b6b',
      fontSize: '1.2rem',
      cursor: 'pointer',
      marginLeft: '10px',
      transition: 'color 0.2s ease',
      padding: '5px',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
      }
    },
    cartFooter: {
      padding: '20px',
      borderTop: '1px solid #333',
    },
    total: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    checkoutBtn: {
      backgroundColor: '#28a745',
      color: '#ffffff',
      border: 'none',
      padding: '12px 20px',
      cursor: 'pointer',
      width: '100%',
      borderRadius: '5px',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'background-color 0.2s ease',
      marginBottom: '15px',
      '&:hover': {
        backgroundColor: '#218838',
      }
    },
    emptyCart: {
      textAlign: 'center',
      padding: '30px 20px',
    },
    continueShoppingBtn: {
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      padding: '12px 20px',
      cursor: 'pointer',
      marginTop: '15px',
      borderRadius: '5px',
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: '#0069d9',
      }
    },
    clearCartBtn: {
      backgroundColor: '#ff6b6b',
      color: '#ffffff',
      border: 'none',
      padding: '8px 16px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '0.9rem',
      marginBottom: '15px',
      alignSelf: 'flex-end',
      transition: 'background-color 0.2s ease',
      fontWeight: '500',
      '&:hover': {
        backgroundColor: '#ff5252',
      }
    },
    cartListHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 0 15px 0',
    },
  };

  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showCart]);

  return (
    <div style={{ ...localStyles.cartPanel, ...(showCart ? localStyles.showCartPanel : {}) }}>
      <div style={localStyles.cartHeader}>
        <h2>Your Cart</h2>
        <button style={localStyles.closeBtn} onClick={() => setShowCart(false)}>×</button>
      </div>
      
      {cart.length > 0 ? (
        <>
          <div style={localStyles.cartItems}>
            <div style={localStyles.cartListHeader}>
              <h3>Items ({cart.length})</h3>
              <button 
                style={localStyles.clearCartBtn} 
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
            
            {cart.map(item => (
              <div style={localStyles.cartItem} key={item.id}>
                <img src={item.image} alt={item.name} style={localStyles.cartItemImage} />
                <div style={localStyles.itemInfo}>
                  <h4>{item.name}</h4>
                  <p>{formatCurrency(item.price)}</p>
                  <p> x {item.quantity}</p>
                </div>
                <div style={localStyles.quantityControls}>
                  <button 
                    style={localStyles.quantityBtn} 
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                  <span style={localStyles.quantityValue}>{item.quantity}</span>
                  <button 
                    style={localStyles.quantityBtn} 
                    onClick={() => dispatch(addQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
               
              </div>
            ))}
          </div>
          <div style={localStyles.cartFooter}>
            <div style={localStyles.total}>
              <span>Total:</span>
              <span>{formatCurrency(getTotalPrice())}</span>
            </div>
            <button 
              style={localStyles.checkoutBtn} 
              onClick={() => {
                setShowCart(false);
                proceedToCheckout();
              }}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div style={localStyles.emptyCart}>
          <p>Your cart is empty</p>
          <button style={localStyles.continueShoppingBtn} onClick={() => setShowCart(false)}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
