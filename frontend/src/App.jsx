import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Collaborate from "./pages/Collaboration";
import Dashboard from "./pages/dashboard";
import Verifyotp from "./pages/Verifyotp.jsx";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route element={<ProtectedRoute forAuthPages={true} />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/collaborate" element={<Collaborate />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verifyotp" element={<Verifyotp />} />
      </Routes>
      <Footer />
    </>
  );
}
