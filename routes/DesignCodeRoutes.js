import express from "express";
import {
  createDesignCode,
  readAllDesignCode,
} from "../controllers/Dashboard/DashboardProduct/DashboardDesignCodeController.js";

const router = express.Router();

router.route("/").get(readAllDesignCode).post(createDesignCode);

export default router;
