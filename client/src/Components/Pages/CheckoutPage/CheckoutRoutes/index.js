import React from "react";
import { Switch, Route } from "react-router-dom";
import CheckoutPage from "../index";
import CheckoutSuccessPage from "../CheckoutSuccessPage";
// import CheckoutPendingPage from "../CheckoutPendingPage";
// import OrderContextProvider from "../../../../Contexts/OrderContext";
export default function index() {
  return (
    // <OrderContextProvider>
    <Switch>
      <Route exact path="/checkout/success" component={CheckoutSuccessPage} />
      {/* <Route exact path="/checkout/pending" component={CheckoutPendingPage} /> */}
      <Route exact path="/checkout" component={CheckoutPage} />
    </Switch>
    // </OrderContextProvider>
  );
}
