import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";

export default function NutritionPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <SearchBar />
      </div>
      <Footer />
    </>
  );
}
