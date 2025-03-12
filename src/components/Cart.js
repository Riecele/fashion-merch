import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} from "../redux/slices/cartSlice";
import { createOrder } from "../redux/slices/ordersSlice";

function Cart({ onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { productItems } = useSelector((state) => state.products);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

 const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(8px)",
      zIndex: 1000
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
      zIndex: 1001
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer"
    },
    cartList: {
      listStyle: "none",
      padding: 0
    },
    cartItem: {
      display: "flex",
      marginBottom: "1rem"
    },
    cartItemImage: {
      width: "200px",
      height: "200px",
      marginRight: "1rem"
    },
    quantityButton: {
      padding: "0.5rem",
      margin: "0 0.5rem",
      backgroundColor: "#ddd",
      border: "none",
      cursor: "pointer"
    },
    removeButton: {
      padding: "0.5rem",
      margin: "0 0.5rem",
      backgroundColor: "#f00",
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
    buyButton: {
      display: "block",
      width: "100%",
      padding: "1rem",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.cart}>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul style={styles.cartList}>
              {cartItems.map((item) => {
                const product = productItems.find(
                  (product) => product.id === item.id
                );
                return (
                  <li key={item.id} style={styles.cartItem}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.cartItemImage}
                    />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p>Price: Kes {item.price * item.quantity}</p>
                      <p>Quantity: {item.quantity}</p>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        style={styles.quantityButton}
                        disabled={item.quantity >= product.quantity}
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        style={styles.removeButton}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <h3>Total: Kes {totalAmount.toFixed(2)}</h3>
            <button
              onClick={() => {
                dispatch(createOrder(cartItems));
              }}
              style={styles.buyButton}
            >
              Buy
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
