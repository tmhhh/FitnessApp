import React from "react";
import Navbar from "../Navbar/Navbar";
import "./style.scss";

import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import IntroduceSection from "../Sections/IntroduceSection";
import ShoppingSection from "../Sections/ShoppingSection";
export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <IntroduceSection />
      <ShoppingSection />
      <Footer />
    </>
  );
}
