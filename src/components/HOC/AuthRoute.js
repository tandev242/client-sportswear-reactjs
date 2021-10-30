import React from "react";
import { Route, Redirect } from "react-router";
const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem("token");
        if (token) {
          return <Redirect to={`/`} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default AuthRoute;
