// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type Product = {
//   id: string;
//   name: string;
//   price: string;
//   discounted_price: string;
//   description: string;
//   images: string[];
//   category: string;
// };

// interface ProductsState {
//   items: Product[];
// }

// const initialState: ProductsState = {
//   items: [],
// };

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     setProducts(state, action: PayloadAction<Product[]>) {
//       state.items = action.payload;
//     },
//   },
// });

// export const { setProducts } = productsSlice.actions;
// export default productsSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get('https://68414ca4d48516d1d35af8a5.mockapi.io/api/v1/data');
  return res.data.map((item: any) => ({
    ...item,
    images: item.images.map((img: string) => img.replace(/^https:/, 'http:')),
  }));
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default productsSlice.reducer;

