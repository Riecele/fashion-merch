import React, { Component } from "react";
import AddProductForm from "./AddProductForm";

class AddProductButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
  }

  handleButtonClick = () => {
    this.setState({ showForm: true })
  };

  handleCloseForm = () => {
    this.setState({ showForm: false });
  };

  render() {
    const { showForm } = this.state;

    const styles = {
      button: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",   
        marginBottom: "20px"
      }
    };

    return (
      <div>
        <button onClick={this.handleButtonClick} style={styles.button}>Add Product</button>
        {showForm && <AddProductForm onClose={this.handleCloseForm} />}
      </div>
    );
  }
}

export default AddProductButton;
