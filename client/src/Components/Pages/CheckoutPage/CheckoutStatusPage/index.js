import React from "react";
import "./style.scss";
export default function CheckoutSuccess({ status }) {
  return status === "success" ? (
    <div className="checkout-card card-success">
      <i className="">✓</i>
      <h1>Success</h1>
      <p>
        We received your purchase request
        <br /> we'll be in touch shortly!
      </p>
    </div>
  ) : (
    <div className="checkout-card card-fail">
      <i className="">✖</i>
      <h1>Fail</h1>
      <p>
        Something wrong happen :(
        <br /> please try again later!
      </p>
    </div>
  );
}
