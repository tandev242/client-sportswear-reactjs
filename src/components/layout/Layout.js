import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
import Policy from "./content/policy/Policy";
import Footer from "./footer/Footer";
import { useSelector } from "react-redux";
import { Stack } from "@material-ui/core";
import Loading from "./loading/Loading";
export default function Layout(props) {
  const auth = useSelector((state) => state.auth);
  const product = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const deliveryInfo = useSelector((state) => state.deliveryInfo);
  const order = useSelector((state) => state.order);

  return (
    <div>
      {auth.loading ||
      product.loading ||
      cart.loading ||
      deliveryInfo.loading ||
      user.loading ||
      order.loading ? (
        <Stack
          sx={{
            width: "100%",
            height: "3000px",
            backgroundColor: "#74737361",
            position: "absolute",
            zIndex: 5,
          }}
        >
          <Loading />
        </Stack>
      ) : null}
      <Navbar />
      <Header />
      {props.children}
      <Policy />
      <Footer />
    </div>
  );
}
