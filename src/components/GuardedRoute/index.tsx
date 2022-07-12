import React from "react";
import { Navigate } from "react-router-dom";

interface GuardedRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default GuardedRoute;
