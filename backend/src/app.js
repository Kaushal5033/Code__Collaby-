import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import compilerRoutes from "./routes/compiler.routes.js";
import resetPasswordRoute from "./routes/resetPassword.route.js";
import updatePassword from "./controllers/updatePassword.controller.js";
import changeProfile from "./routes/changeProfile.router.js";
import verifyJwt from "./middlewares/auth.middleware.js";
import projectRoutes from "./routes/project.routes.js";



const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://codecollaby-frontend.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) or from allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/api/change-profile", verifyJwt, changeProfile);
app.use("/api/update-password/:userId", verifyJwt, updatePassword);
app.use("/api/projects",projectRoutes)

export default app;