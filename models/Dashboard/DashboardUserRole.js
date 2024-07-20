import { Schema, model } from "mongoose";

const DashboardUserRoleSchema = new Schema({
  roleName: { type: String, required: true },
  roleDescription: { type: String, required: true, default: "--" },
  roleCreatedAt: { type: Date, default: Date.now },
  roleCreateBy: { type: String, required: true, default: "Dev" },
  roleStatus: { type: String, required: true, default: "active" },
  roleToken: { type: String, required: true, unique: true },
});

export default model("DashboardUserRole", DashboardUserRoleSchema);
