import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../Assets/load2.svg";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // assuming /reset-password/:token
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post(
          `${BASE_URL}/api/change-password/reset-password/${token}`,
          { password, confirmPassword }
        );
        if (response.status === 200) {
          toast.success(response.data.message, {
            id: "reset-password-success",
            duration: 3000,
          });
          setPassword("");
          setConfirmPassword("");
          navigate("/login");
        }
        
    } catch (error) {
        console.error("Error resetting password:", error);
        if (error.response) {
          toast.error(error.response.data.message || "Something went wrong", {
            id: "reset-password-error",
            duration: 3000,
          });
        } else {
          toast.error("Network error or server not reachable", {
            id: "reset-password-network-error",
            duration: 3000,
          });
        }
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? <img src={loader} alt="Loading..." className="w-6 h-6 mx-auto animate-spin" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
