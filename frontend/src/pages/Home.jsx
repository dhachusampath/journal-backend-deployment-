import React from "react";

import Header from "../components/Header";
import Banner from "../components/Banner";
import Expertise from "../components/Expertise";
import LatestStories from "../components/LatestStories";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Expertise />
      <LatestStories />
      <Footer />
    </>
  );
};

export default Home;
