import { createSlice } from '@reduxjs/toolkit';

const initialCategoryState = { value: 0 };

const categorySlice = createSlice({
  name: 'counter',
  initialState: initialCategoryState,
  reducers: {
    change(state, action) {
      state.value = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;
