import React from "react";

import AddProductButton from "./AddProductButton";
import UpdateProductButton from "./UpdateProductButton";

function Admin({ onClose }) {
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      padding: "20px",
      width: "80%",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333"
    },
    backdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(10px)",
      zIndex: 999
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
    }
  };

  return (
    <>
      <div style={styles.backdrop} onClick={onClose}></div>
      <div style={styles.container}>
        <button onClick={onClose} style={styles.closeButton}>×</button>
        <h2 style={styles.header}>Admin Panel</h2>
        <AddProductButton />
        <UpdateProductButton />
      </div>
    </>
  );
}

export default Admin;
