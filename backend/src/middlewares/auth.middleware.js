import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';


const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(decodedToken);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "error in verifying token", error: error.message });
  }
}



export default verifyJwt;