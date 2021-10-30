import React from "react";
import ReactDOM from "react-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import MessengerCustomerChat from 'react-messenger-customer-chat';

import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <MessengerCustomerChat
        pageId="112014451276507"
        appId="879367169633950"
      />,
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);
