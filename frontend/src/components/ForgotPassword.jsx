import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import loader from "../Assets/load2.svg";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {

    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post(`${BASE_URL}/api/change-password/forgot-password`, { email });
      toast.success(response.data.message, {
        id: "forgot-password-success",
        duration: 3000,
      });
      setEmail("");
      navigate("/login");
    }catch(err){
      if(err.response && err.response.data) {
        toast.error(err.response.data.message, {
          id: "forgot-password-error",
          duration: 3000,
        });
      }
      else{
        toast.error("An unexpected error occurred. Please try again.", {
          id: "forgot-password-error",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? <img src={loader} alt="Loading..." className="w-6 h-6 mx-auto animate-spin" /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
