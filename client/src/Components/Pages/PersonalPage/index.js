import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import Sidebar from "./Sidebar";
import PersonalRoute from "./PersonalRoute";
export default function PersonalPage() {
  const { userInfo } = useSelector((state) => state.authReducer);
  return (
    <div className="personal_page_container">
      <Sidebar {...userInfo} />
      <PersonalRoute />
    </div>
  );
}
