import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage";
import TrainingPage from "../Components/Pages/TrainingPage";

import NutritionPage from "../Components/Pages/NutritionPage";
import ShoppingPage from "../Components/Pages/ShoppingPage";

import Navbar from "../Components/Partials/Navbar";
import Footer from "../Components/Partials/Footer";

import AdminPage from "../Components/Admin/AdminPage";
import CheckoutWrapper from "../Components/Pages/CheckoutPage/CheckoutPageWrapper";
import ProductDetail from "../Components/Pages/ProductDetailPage";
import NotiToast from "../Components/Common/Toast";
import AdminRoute from "../Components/Routing/AdminRoute";
import ProtectedRoute from "../Components/Routing/ProtectedRoute";
import Post from "../Components/Post/Post";
import NewPostPage from "../Components/Pages/PostPage/NewPostPage";
import EditPostPage from "../Components/Pages/PostPage/EditPostPage";
import PersonalPage from "../Components/Pages/PersonalPage";
export default function MainRouter() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Switch>
        <AdminRoute path="/admin" component={AdminPage} />
        <ProtectedRoute path="/checkout" component={CheckoutWrapper} />
        <ProtectedRoute path="/profile" component={PersonalPage} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/training" component={TrainingPage} />
        <Route exact path="/nutrition" component={NutritionPage} />
        <Route exact path="/shopping" component={ShoppingPage} />
        <Route exact path="/post/:postId" component={Post} />
        <Route exact path="/create-post" component={NewPostPage} />
        <Route exact path="/edit-post/:postId" component={EditPostPage} />
        <Route exact path="/" component={HomePage} />
        <Route render={() => <div>NOT FOUND !!!</div>} />
      </Switch>
      <NotiToast />
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}
