import React from "react";
import "./style.scss";
export default function OtherLoginButton({ img, title, handleLogin }) {
  return (
    <div onClick={handleLogin} className="login__button-wrapper">
      <img src={img} alt={title} />
      <span className="login__button-title">{title}</span>
    </div>
  );
}
