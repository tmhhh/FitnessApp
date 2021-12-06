import React from "react";
import Banner from "../../Partials/Banner";
import IntroduceSection from "./Sections/IntroduceSection.jsx";
import ShoppingSection from "./Sections/ShoppingSection";
export default function Home() {
  return (
    <>
      <Banner />
      <IntroduceSection />
      <ShoppingSection />
    </>
  );
}
