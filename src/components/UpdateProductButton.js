import React, { Component } from "react";
import { StoreContext } from "./storeManager";
import UpdateProductForm from "./UpdateProductForm";

class UpdateProductButton extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: null
    };
  }

  handleButtonClick = (product) => {
    this.setState({ selectedProduct: product });
  };

  handleCloseForm = () => {
    this.setState({ selectedProduct: null });
  };

  render() {
    const { products } = this.context;
    const { selectedProduct } = this.state;

    const styles = {
      button: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginBottom: "10px"
      },
      product: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ccc"
      }
    };

    return (
      <div>
        <h3>Update Product</h3>
        {products.map((product) => (
          <div key={product.id} style={styles.product}>
            <span>{product.name}</span>
            <button onClick={() => this.handleButtonClick(product)} style={styles.button}>Update</button>
          </div>
        ))}
        {selectedProduct && (
          <UpdateProductForm product={selectedProduct} onClose={this.handleCloseForm} />
        )}
      </div>
    );
  }
}

export default UpdateProductButton;
