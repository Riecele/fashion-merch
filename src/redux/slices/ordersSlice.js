import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { updateProductQuantity } from "./productsSlice";
import { clearCart } from "./cartSlice";  // Import the clearCart action

const initialState = [];

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const newOrder = {
        id: uuidv4(),
        items: action.payload,
        date: new Date().toISOString(),
      };
      state.push(newOrder);

    
      action.payload.forEach((item) => {
        updateProductQuantity({ id: item.id, quantity: item.quantity });
      });

   
      clearCart(); 
    },
  },
});

export const { createOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
