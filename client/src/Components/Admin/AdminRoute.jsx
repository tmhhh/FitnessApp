import React from "react";
import { Route, Switch } from "react-router-dom";
import ProductSide from "./ProductSide";

export default function AdminRoute({ path }) {
  return (
    <>
      <Switch>
        <Route exact path={path} component={ProductSide} />
        {/* <Route
          exact
          path={path + "/products"}
          component={<div>Products</div>}
        />
        <Route exact path={path + "/users"} component={<div>Users</div>} />
        <Route exact path={path + "/reviews"} component={<div>Reviews</div>} />
        <Route exact path={path + "/vouchers"} component={<div>Voucher</div>} /> */}
      </Switch>
    </>
  );
}
