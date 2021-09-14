import React from "react";
import { Route, Switch } from "react-router-dom";
import ProductSide from "./ManageProduct/ProductSide";
import VoucherSide from "./ManageVoucher";
export default function AdminRoute({ path }) {
  console.log(path);
  return (
    <>
      <Switch>
        <Route exact path={path} component={() => <div>Dashboard</div>} />
        <Route exact path={path + "/product"} component={ProductSide} />
        <Route exact path={path + "/voucher"} component={VoucherSide} />
        {/* 
        <Route exact path={path + "/reviews"} component={<div>Reviews</div>} />
        <Route exact path={path + "/vouchers"} component={<div>Voucher</div>} /> */}
      </Switch>
    </>
  );
}
