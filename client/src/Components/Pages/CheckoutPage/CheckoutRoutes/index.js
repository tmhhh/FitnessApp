import React from "react";
import { Switch, Route } from "react-router-dom";
import CheckoutPage from "../index";
import CheckoutSuccessPage from "../CheckoutSuccessPage";
export default function index() {
  return (
    <Switch>
      <Route exact path="/checkout/success" component={CheckoutSuccessPage} />
      <Route exact path="/checkout" component={CheckoutPage} />
    </Switch>
  );
}
