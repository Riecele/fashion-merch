import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const addQuantity = createAsyncThunk(
  'cart/addQuantity',
  async (id, { getState, dispatch }) => {
    try {
      // Get current item from cart
      const state = getState();
      const item = state.cart.items.find(it => it.id === id);
      console.log("Item:", item); 
      if (item) {
        // Use locally stored available quantity instead of querying Firestore
        if (item.quantity < item.availableQty) {
          dispatch(incrementQuantity(id));
          return { success: true };
        } else {
          return { success: false, message: "Maximum available quantity reached" };
        }
      }
      return { success: false, message: "Item not in cart" };
    } catch (error) {
      console.error("Error checking product quantity:", error);
      return { success: false, message: error.message };
    }
  }
);

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity < existing.availableQty) {
          existing.quantity++;
        }
      } else {
        // Store the available quantity when adding to cart
        state.items.push({ 
          ...product, 
          quantity: 1, 
          availableQty: product.qty || product.quantity 
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const idx = state.items.findIndex((item) => item.id === id);
      if (idx !== -1) {
        state.items[idx].quantity--;
        if (state.items[idx].quantity <= 0) {
          state.items.splice(idx, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item && item.quantity < item.availableQty) {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
          state.items = state.items.filter((it) => it.id !== id);
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    }
  }
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
