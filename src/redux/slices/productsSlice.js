import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  productItems: [
    {
      id: uuidv4(),
      name: "Dress",
      description: "Elegant evening dress",
      quantity: 2,
      price: 50,
      image: "/images/dress.jpg",
    },
    {
      id: uuidv4(),
      name: "Shoes",
      description: "Comfortable shoes",
      quantity: 4,
      price: 60,
      image: "/images/shoes.jpg",
    },
    {
      id: uuidv4(),
      name: "Sunglasses",
      description: "Stylish sunglasses",
      quantity: 6,
      price: 25,
      image: "/images/sunglasses.jpg",
    },
    {
      id: uuidv4(),
      name: "Watch",
      description: "Fashionable wristwatch",
      quantity: 3,
      price: 80,
      image: "/images/watch.jpg",
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { name, description, quantity, price} = action.payload;
      state.productItems.push({
        id: uuidv4(),
        name,
        description,
        quantity,
        price,
        image: "/images/watch.jpg",
      });
    },
    updateProduct: (state, action) => {
      const { id, name, description, quantity, price } = action.payload;
      const product = state.productItems.find((p) => p.id === id);
      if (product) {
        product.name = name;
        product.description = description;
        product.quantity = quantity;
        product.price = price;
      }
    },
    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.productItems.find((p) => p.id === id);
      if (product) {
        product.quantity -= quantity;
      }
    },
    removeProduct: (state, action) => {
      state.productItems = state.productItems.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  addProduct,
  updateProduct,
  removeProduct,
  updateProductQuantity,
} = productsSlice.actions;
export default productsSlice.reducer;
