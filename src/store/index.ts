import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
