import express from "express";
import { createDashboardUserAccount } from "../controllers/Dashboard/DashboardUserAccount/DashboardUserAccountController.js";
import { createDashboardUserRole } from "../controllers/Dashboard/userRole/DashboardUserRole.js";
import {
  DashboardLogin,
  RequestVerifyEmail,
  VerifyEmail,
} from "../controllers/Dashboard/DashboardUserAccount/DashboardAuthenController.js";

const router = express.Router();

router.route("/").post(createDashboardUserAccount);
router.route("/role").post(createDashboardUserRole);
router.route("/login").post(DashboardLogin);
router.route("/verifyEmail").post(RequestVerifyEmail).put(VerifyEmail);

export default router;
