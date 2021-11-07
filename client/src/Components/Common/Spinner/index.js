import React from "react";
import "./style.scss";
export default function Spinner({ type = "border" }) {
  return type === "border" ? (
    <div className="custom__spinner-border"></div>
  ) : (
    <div className="custom__spinner-grow"></div>
  );
}
