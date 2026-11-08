
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import compilerRoutes from "./routes/compiler.routes.js";
import resetPasswordRoute from "./routes/resetPassword.route.js";
import updatePassword from "./controllers/updatePassword.controller.js";
import changeProfile from "./routes/changeProfile.router.js";
import verifyJwt from "./middlewares/auth.middleware.js";
import projectRoutes from "./routes/project.routes.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://codecollaby-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.use(express.static("public"));

app.use("/api/users", userRoute);
app.use("/api/compiler", compilerRoutes);
app.use("/api/change-password", resetPasswordRoute);
app.use("/api/change-profile", verifyJwt, changeProfile);
app.use("/api/update-password/:userId", verifyJwt, updatePassword);

app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Code Collaby backend is running",
  });
});

export default app;
