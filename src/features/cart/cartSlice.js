import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartAPI from "../../api/cartAPI";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItems, thunkAPI) => {
    const response = await cartAPI.addToCart(cartItems);
    await thunkAPI.dispatch(getCartItems());
    return response;
  }
);
export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const response = await cartAPI.getCartItems();
  return response;
});

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItem, thunkAPI) => {
    const response = await cartAPI.removeCartItem(cartItem);
    await thunkAPI.dispatch(getCartItems());
    return response;
  }
);

//tạo 1 initialState Cart
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  message: null,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartSlice: () => initialState,
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.loading = true;
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.data.message;
    },
    [getCartItems.pending]: (state) => {
      state.loading = true;
    },
    [getCartItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.data.cartItems;
    },
    [removeCartItem.pending]: (state) => {
      state.loading = true;
    },
    [removeCartItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [removeCartItem.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const { resetCartSlice } = cartSlice.actions;
export default cartSlice.reducer;
