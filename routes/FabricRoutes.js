import express from "express";

import { createFabric, readAllFabric } from "../controllers/Dashboard/DashboardProduct/DashboardFabricController.js";

const router = express.Router();

router.route("/").get(readAllFabric).post(createFabric);

export default router;
