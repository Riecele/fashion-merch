import React from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = ({ onClick }) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const styles = {
    cartIcon: {
      position: "relative",
      display: "inline-block",
      cursor: "pointer",
    },
    icon: {
      marginLeft: "1rem",
      fontSize: "1.25rem",
    },
    cartCount: {
      position: "absolute",
      top: "-5px",
      right: "-10px",
      backgroundColor: "red",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "3px 6px",
      borderRadius: "50%",
    },
  };

  return (
    <div style={styles.cartIcon} onClick={onClick}>
      <FaShoppingCart style={styles.icon} />
      <span style={styles.cartCount}>{totalQuantity}</span>
    </div>
  );
};

export default CartIcon;
