import express from "express";
import {
  createSize,
  createSizeDetail,
  readAllSize,
  readAllSizeDetail,
} from "../controllers/Dashboard/DashboardProduct/DashboardSizeDeatilController.js";

const router = express.Router();

router.route("/").get(readAllSizeDetail).post(createSizeDetail);
router.route("/size").get(readAllSize).post(createSize);

export default router;
