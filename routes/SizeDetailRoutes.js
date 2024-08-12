import express from "express";
import {
  createSizeDetail,
  readAllSizeDetail,
} from "../controllers/Dashboard/DashboardProduct/DashboardSizeDeatilController.js";

const router = express.Router();

router.route("/").get(readAllSizeDetail).post(createSizeDetail);

export default router;
