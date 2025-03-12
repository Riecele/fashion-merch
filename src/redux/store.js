import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import ordersReducer from "./slices/ordersSlice";

// Combine all slices
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

// Create store without persistence
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Hot module replacement code
if (module.hot) {
  module.hot.accept('./slices/productsSlice', () => {
    const newProductsReducer = require('./slices/productsSlice').default;
    const nextRootReducer = combineReducers({
      products: newProductsReducer,
      cart: cartReducer,
      orders: ordersReducer,
    });
    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept('./slices/cartSlice', () => {
    const newCartReducer = require('./slices/cartSlice').default;
    const nextRootReducer = combineReducers({
      products: productsReducer,
      cart: newCartReducer,
      orders: ordersReducer,
    });
    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept('./slices/ordersSlice', () => {
    const newOrdersReducer = require('./slices/ordersSlice').default;
    const nextRootReducer = combineReducers({
      products: productsReducer,
      cart: cartReducer,
      orders: newOrdersReducer,
    });
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
