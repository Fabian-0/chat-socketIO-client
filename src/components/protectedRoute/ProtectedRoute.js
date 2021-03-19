import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function ProtectedRoute({children, ...props}) {
  const user = useSelector((state) => (state.user.user))
  return (
    <>
      <Route {...props}  render={() => ((user) ? children : <Redirect to="/Login" />)}/>
    </>
  );
}

export default ProtectedRoute;