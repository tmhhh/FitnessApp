import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({
  path,
  component: Component,
  ...rest
}) {
  const {
    userInfo: { userType },
    isAuthenticated,
  } = useSelector((state) => state.authReducer);
  return (
    <>
      {isAuthenticated && userType === 1 ? (
        <Route exact path={path} component={Component} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
