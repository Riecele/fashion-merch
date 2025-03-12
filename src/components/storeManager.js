import React, { createContext, Component } from "react";
import { v4 as uuidv4 } from "uuid";

const StoreContext = createContext();

class StoreProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          name: "Shoe",
          description: "Comfortable running shoes",
          quantity: 10,
          price: 3000,
          image:
            "https://res.cloudinary.com/dcdivbkwd/image/upload/v1676012835/cld-sample-5.jpg"
        },
        {
          id: 2,
          name: "Dress",
          description: "Elegant evening dress",
          quantity: 5,
          price: 5000,
          image:
            "https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3N8ZW58MHx8MHx8fDA%3D"
        },
        {
          id: 3,
          name: "Trouser",
          description: "Stylish trousers",
          quantity: 8,
          price: 2000,
          image:
            "https://images.unsplash.com/photo-1624378441864-6eda7eac51cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJvdXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
          id: 4,
          name: "Sunglasses",
          description: "UV protection sunglasses",
          quantity: 12,
          price: 300,
          image:
            "https://images.unsplash.com/photo-1590564310418-66304f55a2c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN1bmdsYXNzZXN8ZW58MHx8MHx8fDA%3D"
        }
      ],
      cart: [],
      orders: []
    };
  }
  addToCart = (product) => {
    if (product.quantity > 0) {
      this.setState((prevState) => {
        const cartItem = prevState.cart.find((item) => item.id === product.id);
        return {
          products: prevState.products.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
          ),
          cart: cartItem
            ? prevState.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...prevState.cart, { ...product, quantity: 1 }]
        };
      });
    }
  };

  removeFromCart = (productId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((item) => item.id !== productId)
    }));
  };

  increaseCartQuantity = (productId) => {
    this.setState((prevState) => {
      const product = prevState.products.find((p) => p.id === productId);
      const cartItem = prevState.cart.find((item) => item.id === productId);

      if (product && product.quantity > 0) {
        if (cartItem && cartItem.quantity < product.quantity) {
          return {
            cart: prevState.cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else if (!cartItem) {
          return {
            cart: [...prevState.cart, { ...product, quantity: 1 }]
          };
        }
      }
      return null;
    });
  };

  decreaseCartQuantity = (productId) => {
    this.setState((prevState) => {
      const cartItem = prevState.cart.find((item) => item.id === productId);

      if (cartItem && cartItem.quantity > 0) {
        return {
          cart:
            cartItem.quantity > 1
              ? prevState.cart.map((item) =>
                  item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
              : prevState.cart.filter((item) => item.id !== productId)
        };
      }
      return null;
    });
  };

  addProduct = (name, description, quantity) => {
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      quantity,
      image:
        "https://res.cloudinary.com/dcdivbkwd/image/upload/v1676012835/cld-sample-5.jpg"
    };
    this.setState((prevState) => ({
      products: [...prevState.products, newProduct]
    }));
  };

  updateProduct = (productId, name, description, quantity, price) => {
    this.setState((prevState) => ({
      products: prevState.products.map((p) =>
        p.id === productId ? { ...p, name, description, quantity, price } : p
      )
    }));
  };

  removeProduct = (productId) => {
    this.setState((prevState) => ({
      products: prevState.products.filter((product) => product.id !== productId)
    }));
  };

  getTotalCartQuantity = () => {
    return this.state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  createOrder = (cart) => {
    const newOrder = {
      id: uuidv4(),
      items: cart,
      date: new Date().toISOString()
    };

    this.setState((prevState) => ({
      orders: [...prevState.orders, newOrder],
      cart: [],
      products: prevState.products.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return cartItem
          ? { ...product, quantity: product.quantity - cartItem.quantity }
          : product;
      })
    }));
  };

  render() {
    return (
      <React.Fragment>
        <StoreContext.Provider
          value={{
            products: this.state.products,
            cart: this.state.cart,
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            increaseCartQuantity: this.increaseCartQuantity,
            decreaseCartQuantity: this.decreaseCartQuantity,
            addProduct: this.addProduct,
            updateProduct: this.updateProduct,
            removeProduct: this.removeProduct,
            getTotalCartQuantity: this.getTotalCartQuantity,
            createOrder: this.createOrder
          }}
        >
          {this.props.children}
        </StoreContext.Provider>
      </React.Fragment>
    );
  }
}

export { StoreProvider, StoreContext };
