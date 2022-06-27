import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
export default function ProtectedRoute({
  path,
  component: Component,
  exactPath,
}) {
  const { isAuthenticated, authLoading } = useSelector(
    (state) => state.authReducer
  );
  return (
    <>
      {authLoading ? (
        <div style={{ height: "100vh" }}> </div>
      ) : isAuthenticated ? (
        !exactPath ? (
          <Route path={path} component={Component} />
        ) : (
          <Route exact path={path} component={Component} />
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
