import React from "react";
import { Switch, Route } from "react-router-dom";
import UserBio from "../UserBio";
import UserBill from "../UserBill";
import UserSchedule from "../UserSchedule";
export default function PersonalRoute({ parentPath }) {
  // alert(parentPath)
  return (
    <Switch>
      <Route exact path={`/profile`} component={UserBio} />
      <Route exact path={`/profile/bill`} component={UserBill} />
      <Route exact path={`/profile/schedule`} component={UserSchedule} />
    </Switch>
  );
}
