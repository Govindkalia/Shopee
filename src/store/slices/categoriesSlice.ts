// // import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // type CategorySummary = {
// //   name: string;
// //   count: number;
// //   images: string[];
// // };

// // interface CategoriesState {
// //   summaries: CategorySummary[];
// // }

// // const initialState: CategoriesState = {
// //   summaries: [],
// // };

// // const categoriesSlice = createSlice({
// //   name: 'categories',
// //   initialState,
// //   reducers: {
// //     setCategories(state, action: PayloadAction<CategorySummary[]>) {
// //       state.summaries = action.payload;
// //     },
// //   },
// // });

// // export const { setCategories } = categoriesSlice.actions;
// // export default categoriesSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState } from '../../store';

// export const fetchCategories = createAsyncThunk(
//   'categories/fetchCategories',
//   async (_, { getState }) => {
//     const products = (getState() as RootState).products.items;
//     const categoryMap: Record<string, any> = {};

//     products.forEach(item => {
//       if (!categoryMap[item.category]) {
//         categoryMap[item.category] = {
//           name: item.category,
//           count: 1,
//           images: item.images.slice(0, 4),
//         };
//       } else {
//         categoryMap[item.category].count += 1;
//         const currentImages = categoryMap[item.category].images;
//         if (currentImages.length < 4) {
//           categoryMap[item.category].images.push(...item.images.slice(0, 4 - currentImages.length));
//         }
//       }
//     });

//     return Object.values(categoryMap);
//   }
// );

// const categoriesSlice = createSlice({
//   name: 'categories',
//   initialState: { summaries: [] },
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(fetchCategories.fulfilled, (state, action) => {
//       state.summaries = action.payload;
//     });
//   },
// });

// export default categoriesSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // adjust path if needed
import { Product } from '../../types/Product';

type CategorySummary = {
  name: string;
  count: number;
  images: string[];
};

export const fetchCategories = createAsyncThunk<CategorySummary[], void, { state: RootState }>(
  'categories/fetchCategories',
  async (_, { getState }) => {
    const products = getState().products.items as Product[];

    const categoryMap: Record<string, CategorySummary> = {};

    products.forEach(item => {
      const category = item.category;
    
      if (!categoryMap[category]) {
        categoryMap[category] = {
          name: category,
          count: 1,
          images: item.images.length > 0 ? [item.images[0]] : [],
        };
      } else {
        categoryMap[category].count += 1;
    
        const currentImages = categoryMap[category].images;
        if (currentImages.length < 4 && item.images.length > 0) {
          currentImages.push(item.images[0]);
        }
      }
    });
    

    return Object.values(categoryMap);
  }
);

interface CategoriesState {
  summaries: CategorySummary[];
}

const initialState: CategoriesState = {
  summaries: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.summaries = action.payload;
    });
  },
});

export default categoriesSlice.reducer;

