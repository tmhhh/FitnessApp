import React from "react";
import { Switch, Route } from "react-router-dom";
import UserBio from "../UserBio";
import UserBill from "../UserBill";
import UserSchedule from "../UserSchedule";
import UserPost from "../UserPost";
import UserBillHistory from "../UserBillHistory";
export default function PersonalRoute({ parentPath }) {
  return (
    <Switch>
      <Route exact path={`/profile`} component={UserBio} />
      <Route exact path={`/profile/bill`} component={UserBill} />
      <Route exact path={`/profile/bill-history`} component={UserBillHistory} />
      <Route exact path={`/profile/schedule`} component={UserSchedule} />
      <Route exact path={`/profile/post`} component={UserPost} />
    </Switch>
  );
}
