
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Collaborate from "./pages/Collaborate.jsx";
import Collaborate_2 from "./pages/Collaborate_2.jsx";
import Dashboard from "./pages/dashboard";
import Verifyotp from "./pages/Verifyotp.jsx";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import UpdatePassword from "./components/UpdatePassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";


export default function App() {
  return (
  <>
      <Toaster position="top-center" />
    <Routes>
      <Route path="/verifyotp" element={<Verifyotp />} />
      <Route path="/about" element={<About />} />
      <Route path="/collaborate" element={<Collaborate />} />
      <Route path="/collaborate_2/:RoomId" element={<Collaborate_2 />} />
      <Route path ='/reset-password/:token' element={<ResetPassword />} />
      <Route path="/" element={<Home />} />

      <Route element={<ProtectedRoute forAuthPages={true} />}>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Route>
       
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>
    </Routes>
  </>
  );
}
