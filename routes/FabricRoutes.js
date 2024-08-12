import express from "express";

import {} from "../controllers/Fabric/FabricController.js";
import { createFabric, readAllFabric } from "../controllers/Dashboard/DashboardProduct/DashboardFabricController.js";

const router = express.Router();

router.route("/").get(readAllFabric).post(createFabric);

export default router;
