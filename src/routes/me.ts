import * as meController from "@controls/meController";
import express from "express";

import asyncWrap from "@/middleware/asyncWrapper";

const router = express.Router();

router.get("/", asyncWrap(meController.getProfile));

export default router;
