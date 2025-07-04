import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface CartItem extends Product {
  selectedSize: string; // User-selected size
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<{ id: string; selectedSize: string }>) {
      state.items = state.items.filter(
        item => !(item.id === action.payload.id && item.selectedSize === action.payload.selectedSize)
      );
    },
    updateQuantity(state, action: PayloadAction<{ id: string; selectedSize: string; quantity: number }>) {
      const item = state.items.find(
        item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
