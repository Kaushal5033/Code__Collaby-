import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';


const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
      return res.status(401).json({ message: "Unauthorized access or session expired please login again" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
      req.user = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName
    };
    next();
  } catch (error) {
    return res.status(500).json({ message: "error in verifying token", error: error.message });
  }
}

export default verifyJwt;