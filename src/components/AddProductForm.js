import React, { Component } from "react";
import { StoreContext } from "./storeManager";

class AddProductForm extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      quantity: 0,
      price: 0, // Added price field
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAddProduct = () => {
    const { addProduct } = this.context;
    const { name, description, quantity, price } = this.state; // Added price
    const { onClose } = this.props;
    addProduct(name, description, quantity, price); // Added price
    this.setState({ name: "", description: "", quantity: 0, price: 0 }); // Reset price
    onClose();
  };

  render() {
    const { onClose } = this.props;
    const { name, description, quantity, price } = this.state; // Added price

    const styles = {
      formContainer: {
      padding: "20px",
      width: "80%",
      maxWidth: "400px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1001,
      backdropFilter: "blur(30px)" 
      },
      input: {
      display: "block",
      width: "90%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc"
      },
      button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "10px"
      },
      backdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
     backgroundColor: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(10px)",
      zIndex: 1000
      }
    };

    return (
      <>
        <div style={styles.backdrop} onClick={onClose}></div>
        <div style={styles.formContainer}>
          <h3>Add Product</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={quantity}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </label>
          <button onClick={this.handleAddProduct} style={styles.button}>Add Product</button>
          <button onClick={onClose} style={styles.button}>Close</button>
        </div>
      </>
    );
  }
}

export default AddProductForm;
