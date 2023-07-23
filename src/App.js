import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import NotFound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:(<Protected>
    <Home></Home>
    </Protected> )
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element:( <Protected><CartPage></CartPage></Protected>),
  },
  {
    path: "/checkout",
    element: (<Protected><Checkout></Checkout></Protected>),
  },
  {
    path: "/product-detail/:id",
    element: (<Protected><ProductDetailPage></ProductDetailPage></Protected>),
  },
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccess></OrderSuccess></Protected>,
  },
  {
    path: "/orders",
    element: <Protected><UserOrdersPage></UserOrdersPage></Protected>,
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage></UserProfilePage></Protected>,
  },
  {
    path: "/logout",
    element: <Protected><Logout></Logout></Protected>,
  },
  {
    path: "/forgotPassword",
    element:<ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "*",
    element:<NotFound></NotFound>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(()=>{
    if(user){
    dispatch(fetchItemsByUserIdAsync(user.id));
    dispatch(fetchLoggedInUserAsync(user.id));
  }
  },[dispatch,user])
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
