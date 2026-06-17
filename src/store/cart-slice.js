import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { cartList: [], totalCost: 0, numberOfUnits: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addNewProduct(state, action) {
      state.cartList.push({
        id: action.payload.id,
        name: action.payload.name,
        size: action.payload.size,
        count: action.payload.count,
        price: action.payload.price,
        totalCost: action.payload.count * action.payload.price,
      });
      state.numberOfUnits = state.numberOfUnits + 1;
      state.totalCost =
        state.totalCost + action.payload.count * action.payload.price;
    },
    addProduct(state, action) {
      const existingCartListItemIndex = state.cartList.findIndex((item) => {
        return item.id === action.payload.id;
      });
      const existingCartListItem = state.cartList[existingCartListItemIndex];
      let updatedCartListItem;
      let updatedCartList;
      updatedCartListItem = {
        ...existingCartListItem,
        count: existingCartListItem.count + action.payload.count,
        totalCost:
          existingCartListItem.totalCost +
          existingCartListItem.price * action.payload.count,
      };
      updatedCartList = [...state.cartList];
      updatedCartList[existingCartListItemIndex] = updatedCartListItem;
      state.cartList = [...updatedCartList];
      state.totalCost =
        state.totalCost + action.payload.count * existingCartListItem.price;
    },
    delProduct(state, action) {
      const updatedCartList = state.cartList.filter((elem) => {
        return elem.id !== action.payload.id;
      });
      state.cartList = [...updatedCartList];
      state.totalCost = state.totalCost - action.payload.totalCost;
      state.numberOfUnits = state.numberOfUnits - 1;
    },
    cleaningCart(state) {
      state.cartList = [];
      state.totalCost = 0;
      state.numberOfUnits = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
