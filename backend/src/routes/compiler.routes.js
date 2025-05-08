import express from "express";

import { executeCode } from "../controllers/compiler.controller.js";

const router = express.Router();

router.post("/execute", executeCode);

// module.exports = router;
export default router;
