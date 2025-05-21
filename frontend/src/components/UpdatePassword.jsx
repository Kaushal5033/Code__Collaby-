import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getUserId } from "../utils/userUtils";
import loader from "../Assets/load2.svg";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userId = getUserId();
   try {
    const response = await axios.post(`${BASE_URL}/api/update-password/${userId}`,formData)
    
    if(response.status == 200){
      toast.success(response.data.message, {
        id: "success",
        duration: 3000,
      });
      navigate("/dashboard");
    }
   } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message || "Something went wrong", {
        id: "error",
        duration: 3000,
      });
    }else{
      toast.error("Network error or server not reachable", {
        id: "error",
        duration: 3000,
      });
    }
   
   }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="bg-zinc-900 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Change <span className="text-blue-500">Password</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              onChange={handleChange}
              className="update-password-input"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              className="update-password-input"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              className="update-password-input"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            disabled={loading}
          >
            {loading ? <img src={loader} alt="Loading..." className="w-6 h-6 mx-auto animate-spin" /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
