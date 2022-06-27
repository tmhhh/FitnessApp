import React from "react";
import { Switch, Route } from "react-router-dom";
import CheckoutPage from "../index";
import CheckoutStatusPage from "../CheckoutStatusPage";
// import CheckoutPendingPage from "../CheckoutPendingPage";
// import OrderContextProvider from "../../../../Contexts/OrderContext";
import { Helmet } from "react-helmet";
export default function index() {
  return (
    // <OrderContextProvider>
    <>
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Manage your shopping cart" />
      </Helmet>
      <Switch>
        <Route
          exact
          path="/checkout/success"
          component={() => <CheckoutStatusPage status="success" />}
        />
        <Route
          exact
          path="/checkout/fail"
          component={() => <CheckoutStatusPage status="fail" />}
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </>
  );
}
