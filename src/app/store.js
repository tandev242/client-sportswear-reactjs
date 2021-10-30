import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import deliveryInfoReducer from "../features/deliveryInfo/deliveryInfoSlice";
import orderReducer from "../features/order/orderSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    brand: brandReducer,
    product: productReducer,
    cart: cartReducer,
    deliveryInfo: deliveryInfoReducer,
    order: orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
