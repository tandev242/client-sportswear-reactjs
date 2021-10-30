import React from "react";

import Layout from "../components/layout/Layout";
import Slides from "../components/layout/slides/Slides";
import Content from "../components/layout/content/Content";
const Home = () => {
  return (
    //   If user don't login , system will redirect to login page
    // <Redirect to="/login" />
    <Layout>
      <Slides />
      <Content />
    </Layout>
  );
};

export default Home;
