import DashboardUserAccount from "../../../models/Dashboard/DashboardUserAccount.js";
import DashboardUserRole from "../../../models/Dashboard/DashboardUserRole.js";
import bcrypt from "bcrypt";

export const createDashboardUserAccount = async (req, res) => {
  try {
    const data = req.body;
    //check if email already exists
    const emailExists = await DashboardUserAccount.findOne({ userEmail: data.userEmail });
    if (emailExists) return res.status(400).json({ message: "Email already exists" });
    //check if username already exists
    const usernameExists = await DashboardUserAccount.findOne({ userName: data.userName });
    if (usernameExists) return res.status(400).json({ message: "Username already exists" });

    const getUserRole = await DashboardUserRole.findOne({ roleName: "user" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.userPassword, salt);
    const newDashboardUserAccount = new DashboardUserAccount({
      userName: data.userName,
      userPassword: hashedPassword,
      userEmail: data.userEmail,
      userRole: getUserRole.roleToken,
      firstName: data.firstName,
      lastName: data.lastName,
      userStatus: "active",
    });
    await newDashboardUserAccount.save();
    res.status(201).json(newDashboardUserAccount);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const ReadDashboardUserAccount = async (req, res) => {
  try {
    const data = await DashboardUserAccount.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const ReadOneDashboardUserAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DashboardUserAccount.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const UpdateDashboardUserAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No DashboardUserAccount with id: ${id}`);
    const updatedDashboardUserAccount = await DashboardUserAccount.findByIdAndUpdate(
      id,
      { ...data, id },
      {
        new: true,
      }
    );
    res.status(200).json(updatedDashboardUserAccount);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const DeleteDashboardUserAccount = async (req, res) => {};
