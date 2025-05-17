import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import compilerRoutes from "./routes/compiler.routes.js";
import resetPasswordRoute from "./routes/resetPassword.route.js";
import updatePassword from "./controllers/updatePassword.controller.js";
import changeProfile from "./routes/changeProfile.router.js";



const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(express.json({ limit: '16kb' }));
//mounting routes
app.use("/api/users", userRoute);
app.use("/api/compiler", compilerRoutes);
app.use("/api/change-password", resetPasswordRoute);
app.use("/api/change-profile", changeProfile);
app.use("/api/update-password/:userId", updatePassword);

export default app;