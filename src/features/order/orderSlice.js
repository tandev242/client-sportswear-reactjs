import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderAPI from "../../api/orderAPI";

export const getAllOrders = createAsyncThunk("order/getAllOrders", async () => {
  const response = await orderAPI.getAllOrders();
  return response;
});

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId) => {
    const response = await orderAPI.getOrderById(orderId);
    return response;
  }
);

export const addOrder = createAsyncThunk("order/addOrder", async (order) => {
  const response = await orderAPI.addOrder(order);
  return response;
});

export const paymentWithMomo = createAsyncThunk(
  "order/paymentWithMomo",
  async (order) => {
    const response = await orderAPI.paymentWithMomo(order);
    return response;
  }
);
const initialState = {
  orders: [],
  order: {},
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderSlice: () => initialState,
  },
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.loading = true;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload.data.orders;
    },
    [getOrderById.pending]: (state) => {
      state.loading = true;
    },
    [getOrderById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload.data.order;
    },
    [addOrder.pending]: (state) => {
      state.loading = true;
    },
    [addOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [addOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload.data.order;
    },
    [paymentWithMomo.pending]: (state) => {
      state.loading = true;
    },
    [paymentWithMomo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [paymentWithMomo.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const { resetOrderSlice } = orderSlice.actions;
export default orderSlice.reducer;
