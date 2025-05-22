import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserData, getUserId } from "../utils/userUtils";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loader from "../Assets/load2.svg";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originalEmail, setOriginalEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [showVerify, setShowVerify] = useState(false);

  const userId = getUserId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(userId);
        setUserData(userData);
        setOriginalEmail(userData.email);
        setFormData({
          name: userData.fullName,
          email: userData.email,
          bio: userData.bio,
        });
        if (userData.message || userData.success === false) {
          toast.error(userData.message, {
            id: "error",
            duration: 2000,
          });
          localStorage.removeItem("userId");
          navigate("/login");
        }
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message, {
            id: "profile-update-error",
            duration: 3000,
          });
        } else {
          toast.error("Error fetching user data", {
            id: "profile-update-error",
            duration: 3000,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    setShowVerify(formData.email !== originalEmail);
  }, [formData.email, originalEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/change-profile/${userId}`, formData);
      toast.success("Profile updated successfully", {
        id: "profile-updated",
        duration: 3000,
      });
      setUserData({ ...userData, ...formData });
      setOriginalEmail(formData.email);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          id: "profile-update-error",
          duration: 3000,
        });
      } else {
        toast.error("Error updating profile", {
          id: "profile-update-error",
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-4 py-10 flex justify-center items-start">
        <div className="bg-zinc-900 p-10 rounded-2xl shadow-xl w-full max-w-4xl mt-20">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Edit <span className="text-blue-500">Profile</span>
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="profile-input"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                // onChange={handleChange}
                disabled
                className="profile-input"
                required
              />
              {showVerify && (
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white mt-5 py-3 px-8 rounded-xl transition"
                  onClick={() => alert("Verification email sent")}
                >
                  Verify Email
                </button>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="profile-input"
              />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
              <Link
                to="/update-password"
                className="text-red-500 hover:underline text-sm"
              >
                Change Password
              </Link>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl transition"
                disabled={loading}
              >
                {loading ? (
                  <img
                    src={loader}
                    alt="Loading..."
                    className="w-6 h-6 mx-auto animate-spin"
                  />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
