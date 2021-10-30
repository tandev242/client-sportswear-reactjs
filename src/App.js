import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/HOC/PrivateRoute";
import AuthRoute from "./components/HOC/AuthRoute";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Home from "./views/Home";
import Collections from "./views/Collections";
import ProductDetails from "./views/ProductDetails";
import Cart from "./views/Cart";
import Account from "./views/Account";
import Checkout from "./views/Checkout";
import Contact from "./views/Contact";
import About from "./views/About";
import Login from "./views/Login";
import Register from "./views/Register";
import Forget from "./views/Forget";
import Size from "./views/Size";
import MyOrder from "./views/MyOrder";
import NotFound from "./views/NotFound";
import { isUserLoggedIn } from "./features/auth/authSlice";
import { getCategories } from "./features/category/categorySlice";
import { getBrands } from "./features/brand/brandSlice";
import { getProducts, getSizes } from "./features/product/productSlice";
import { getDeliveryInfo } from "./features/deliveryInfo/deliveryInfoSlice";
import { getCartItems } from "./features/cart/cartSlice";
import "react-toastify/dist/ReactToastify.css";
import "./scss/app.scss";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getProducts());
    dispatch(getSizes());
  }, []);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    } else {
      dispatch(getDeliveryInfo());
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path={[`/collections/:type/:slug`, `/collections/search`]}
            component={Collections}
          />
          <Route path={`/product/:slug`} component={ProductDetails} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/account" component={Account} />
          <PrivateRoute exact path="/order" component={MyOrder} />
          <PrivateRoute exact path="/checkout" component={Checkout} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/forget" component={Forget} />
          <Route exact path="/size-choose" component={Size} />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
