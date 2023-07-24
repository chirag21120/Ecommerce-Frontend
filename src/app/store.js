import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/ProductSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice'
import adminReducer from '../features/admin/adminSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    admin: adminReducer
  },
});
