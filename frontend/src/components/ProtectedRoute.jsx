import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ forAuthPages = false }) => {
  //means that if the forAuthPages prop is not passed when using ProtectedRoute, it will default to false.
  const userId = localStorage.getItem("userId");

  // For protected pages (like dashboard), show if user is logged in
  if (!forAuthPages && !userId) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, prevent access to Login and Signup
  if (forAuthPages && userId) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
