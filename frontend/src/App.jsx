import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const About = lazy(() => import("./pages/About"));
const Collaborate = lazy(() => import("./pages/Collaborate.jsx"));
const Collaborate_2 = lazy(() => import("./pages/Collaborate_2.jsx"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Verifyotp = lazy(() => import("./pages/Verifyotp.jsx"));
const Profile = lazy(() => import("./pages/Profile"));
const UpdatePassword = lazy(() => import("./components/UpdatePassword.jsx"));
const ResetPassword = lazy(() => import("./components/ResetPassword.jsx"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword.jsx"));

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* Suspense provides a fallback while components are lazy-loaded */}
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Routes>
          <Route path="/verifyotp" element={<Verifyotp />} />
          <Route path="/about" element={<About />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/collaborate_2/:RoomId" element={<Collaborate_2 />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />

          {/* Public auth-related routes */}
          <Route element={<ProtectedRoute forAuthPages={true} />}>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Private routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-profile" element={<Profile />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
