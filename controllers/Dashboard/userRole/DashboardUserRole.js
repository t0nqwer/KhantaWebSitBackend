import DashboardUserRole from "../../../models/Dashboard/DashboardUserRole.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { v6 as uuid } from "uuid";

const createRToken = async () => {
  const rToken = sign({ name: "DashboardUserRole" }, process.env.TOKEN_SECRET, {
    expiresIn: "1y",
  });
  return rToken;
};

export const createDashboardUserRole = async (req, res) => {
  try {
    const data = req.body;
    //check if roleName already exists
    const roleNameExists = await DashboardUserRole.findOne({ roleName: data.roleName });
    if (roleNameExists) return res.status(400).json({ message: "Role already exists" });
    const newDashboardUserRole = new DashboardUserRole({
      roleName: data.roleName,
      roleToken: uuid(),
    });
    await newDashboardUserRole.save();
    res.status(201).json(newDashboardUserRole);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const ReadDashboardUserRole = async (req, res) => {};
export const ReadOneDashboardUserRole = async (req, res) => {};
export const UpdateDashboardUserRole = async (req, res) => {};
export const DeleteDashboardUserRole = async (req, res) => {};
