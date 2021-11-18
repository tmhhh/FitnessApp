import React from "react";
import { Route, Switch } from "react-router-dom";
import ProductSide from "./ManageProduct/ProductSide";
import VoucherSide from "./ManageVoucher";
import CateSide from "./ManageCate";
import ExerciseSide from "./ManageExercise";
import Dashboard from "./Dashboard";

export default function AdminRoute({ path }) {
  // console.log(path);
  return (
    <>
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route exact path={path + "/product"} component={ProductSide} />
        <Route exact path={path + "/voucher"} component={VoucherSide} />
        <Route exact path={path + "/category"} component={CateSide} />
        <Route exact path={path + "/exercise"} component={ExerciseSide} />
        {/* 
        <Route exact path={path + "/reviews"} component={<div>Reviews</div>} />
        <Route exact path={path + "/vouchers"} component={<div>Voucher</div>} /> */}
      </Switch>
    </>
  );
}
