import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ path, component: Component }) {
  const {
    userInfo: { userType },
    isAuthenticated,
    authLoading,
  } = useSelector((state) => state.authReducer);
  return (
    <>
      {authLoading ? null : isAuthenticated && userType === 1 ? (
        <Route path={path} component={Component} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
