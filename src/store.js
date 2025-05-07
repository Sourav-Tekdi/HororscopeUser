import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'; // example slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
