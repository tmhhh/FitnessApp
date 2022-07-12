import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../components/Pages/HomePage";
import TrainingPage from "../components/Pages/TrainingPage";

import NutritionPage from "../components/Pages/NutritionPage";
import ShoppingPage from "../components/Pages/ShoppingPage";

import Footer from "../components/Partials/Footer";
import Navbar from "../components/Partials/Navbar";

import ServicePage from "components/Pages/ServicePage";
import { Helmet } from "react-helmet";
import AdminPage from "../components/Admin/AdminPage";
import BlogPage from "../components/Pages/BlogPage";
import CheckoutWrapper from "../components/Pages/CheckoutPage/CheckoutPageWrapper";
import PersonalPage from "../components/Pages/PersonalPage";
import EditPostPage from "../components/Pages/PostPage/EditPostPage";
import NewPostPage from "../components/Pages/PostPage/NewPostPage";
import ProductDetail from "../components/Pages/ProductDetailPage";
import Post from "../components/Post/Post";
import AdminRoute from "../components/Routing/AdminRoute";
import ProtectedRoute from "../components/Routing/ProtectedRoute";

export default function MainRouter() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fitness App</title>a
        <meta name="description" content="The world of fitness application" />
        <meta name="keyword" content="Fitness Application" />
      </Helmet>
      <Switch>
        <AdminRoute path="/admin" component={AdminPage} />
        <ProtectedRoute path="/checkout" component={CheckoutWrapper} />
        <ProtectedRoute path="/profile" component={PersonalPage} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/training" component={TrainingPage} />
        <Route exact path="/nutrition" component={NutritionPage} />
        <Route exact path="/shopping" component={ShoppingPage} />
        <Route exact path="/blog" component={BlogPage} />
        <Route exact path="/post/:postId" component={Post} />
        <ProtectedRoute exact path="/create-post" component={NewPostPage} />
        <Route exact path="/edit-post/:postId" component={EditPostPage} />
        <Route exact path="/service" component={ServicePage} />
        <Route exact path="/" component={HomePage} />
        <Route render={() => <div>NOT FOUND !!!</div>} />
      </Switch>
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}
