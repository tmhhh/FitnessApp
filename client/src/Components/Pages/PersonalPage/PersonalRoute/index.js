import React from "react";
import { Switch, Route } from "react-router-dom";
import UserBio from "../UserBio";
import UserBill from "../UserBill";
export default function PersonalRoute({ parentPath }) {
  // alert(parentPath)
  return (
    <Switch>
      <Route exact path={`/profile`} component={UserBio} />
      <Route exact path={`/profile/bill`} component={UserBill} />
    </Switch>
  );
}
