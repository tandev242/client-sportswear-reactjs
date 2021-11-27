import React from "react";
import Layout from "../components/layout/Layout";
import Slides from "../components/layout/slides/Slides";
import Content from "../components/layout/content/Content";
import { useSelector } from "react-redux";

const Home = () => {
  const category = useSelector((state) => state.category);
  const brand = useSelector((state) => state.brand);

  return (
    //   If user don't login , system will redirect to login page
    // <Redirect to="/login" />
    <Layout>
      <Slides />
      <Content brand={brand} category={category} />
    </Layout>
  );
};

export default Home;
