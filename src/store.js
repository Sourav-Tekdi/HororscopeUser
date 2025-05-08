import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './user/features/cart/cartSlice'; // example slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
