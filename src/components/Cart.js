import React, { useContext } from "react";
import { StoreContext } from "./storeManager";

function Cart({ onClose }) {
  const { cart, removeFromCart, increaseCartQuantity, decreaseCartQuantity, createOrder } = useContext(StoreContext);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBuy = () => {
    createOrder(cart);
    onClose();
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
     backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(8px)", 
      zIndex: 1000,
    },
    cart: {
      position: "fixed",
      width: "80%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "2rem",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      zIndex: 1001,
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    cartList: {
      listStyle: "none",
      padding: 0,
    },
    cartItem: {
      display: "flex",
      marginBottom: "1rem",
    },
    cartItemImage: {
      width: "200px",
      height: "200px",
      marginRight: "1rem",
    },
    quantityButton: {
      padding: "0.5rem",
      margin: "0 0.5rem",
      backgroundColor: "#ddd",
      border: "none",
      cursor: "pointer",
    },
    removeButton: {
      padding: "0.5rem",
      margin: "0 0.5rem",
      backgroundColor: "#f00",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
    buyButton: {
      display: "block",
      width: "100%",
      padding: "1rem",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.cart}>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul style={styles.cartList}>
              {cart.map((item) => (
                <li key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.cartItemImage} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: Kes {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => increaseCartQuantity(item.id)} style={styles.quantityButton}>+</button>
                    <button onClick={() => decreaseCartQuantity(item.id)} style={styles.quantityButton}>-</button>
                    <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Total: Kes {totalAmount}</h3>
            <button onClick={handleBuy} style={styles.buyButton}>Buy</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
