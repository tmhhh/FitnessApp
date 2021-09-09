import React from "react";
import Banner from "../../Banner/Banner";
import IntroduceSection from "./Sections/IntroduceSection";
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
