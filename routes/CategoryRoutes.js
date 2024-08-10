import express from "express";
import {
  createCategory,
  deleteCategory,
  readAllCategory,
  updateCategory,
} from "../controllers/Dashboard/DashboardProduct/DashboardCategoryController.js";

const router = express.Router();

router.route("/").get(readAllCategory).post(createCategory);
router.route("/:id").delete(deleteCategory).put(updateCategory);

export default router;
