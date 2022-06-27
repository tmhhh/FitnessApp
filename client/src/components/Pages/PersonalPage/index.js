import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import Sidebar from "./Sidebar";
import PersonalRoute from "./PersonalRoute";
import { Helmet } from "react-helmet";
export default function PersonalPage() {
  const { isAuthenticated, userInfo } = useSelector(
    (state) => state.authReducer
  );
  return (
    <div className="personal_page_container">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Manage your personal information" />
      </Helmet>
      <Sidebar {...userInfo} />
      <PersonalRoute {...userInfo} isAuthenticated={isAuthenticated} />
    </div>
  );
}
