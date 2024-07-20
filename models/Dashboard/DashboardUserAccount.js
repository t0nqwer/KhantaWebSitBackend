import { Schema, model } from "mongoose";

const DashboardUserAccountSchema = new Schema({
  userName: { type: String, required: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userRole: { type: String, required: true },
  userStatus: { type: String, required: true },
  userCreatedAt: { type: Date, default: Date.now },
  userUpdatedAt: { type: Date, default: Date.now },
  userDeletedAt: { type: Date, default: null },
  userDeleted: { type: Boolean, default: false },
  userDeletedBy: { type: String, default: null },
  userDeletedReason: { type: String, default: null },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isVerify: { type: Boolean, default: false },
  verifyToken: { type: String, default: null },
  refreshToken: { type: String, default: null },
});

const DashboardUserAccount = model("DashboardUserAccount", DashboardUserAccountSchema);

export default DashboardUserAccount;
