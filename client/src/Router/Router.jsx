import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage/HomePage";
import TrainingPage from "../Components/Pages/TrainingPage/TrainingPage";

import NutritionPage from "../Components/Pages/NutritionPage/NutritionPage";
import ShoppingPage from "../Components/Pages/ShoppingPage/ShoppingPage";

import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

import AdminPage from "../Components/Admin/AdminPage";
import CheckoutPage from "../Components/Pages/CheckoutPage/CheckoutPage"
import ProductDetail from "../Components/Pages/ProductDetailPage/ProductDetailPage"
export default function MainRouter() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/admin" component={AdminPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/proDetail/:id" component={ProductDetail} />
        <Route exact path="/training" component={TrainingPage} />
        <Route exact path="/nutrition" component={NutritionPage} />
        <Route exact path="/shopping" component={ShoppingPage} />
        <Route render={()=><div>NOT FOUND !!!</div>}/> 
     </Switch>
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}
