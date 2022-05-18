import React from "react";
import { auth } from "../../firebase.init";
import { Spinner } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center m-auto">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return children;
  } 
  else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;