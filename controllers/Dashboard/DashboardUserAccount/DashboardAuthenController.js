import axios from "axios";
import DashboardUserAccount from "../../../models/Dashboard/DashboardUserAccount.js";
import DashboardUserRole from "../../../models/Dashboard/DashboardUserRole.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import { verifyEmail } from "../../../functions/SentEmail.js";
const { verify, sign } = pkg;

const createToken = (id) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  console.log(Math.floor(tomorrow / 1000));
  return sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: Math.floor(tomorrow / 1000) - Math.floor(today / 1000),
    // expiresIn: "10000",
  });
};
const createRefreshToken = (id) => {
  return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};
const createEmailVerifyToken = (id) => {
  return sign({ id }, process.env.EMAIL_VERIFY_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const verifyEmailToken = (token) => {
  return verify(token, process.env.EMAIL_VERIFY_TOKEN_SECRET);
};
export const DashboardLogin = async (req, res) => {
  try {
    const data = req.body;

    // check username
    const usernameExists = await DashboardUserAccount.findOne({ userName: data.username });
    if (!usernameExists) return res.status(400).json({ message: "Username does not exist" });
    // check password
    const validPassword = await bcrypt.compare(data.password, usernameExists.userPassword);
    if (!validPassword) return res.status(400).json({ message: "Password is incorrect" });
    const token = createToken(usernameExists._id);
    const refreshToken = createRefreshToken(usernameExists._id);
    await DashboardUserAccount.findByIdAndUpdate(usernameExists._id, { refreshToken: refreshToken });
    // remove password from response
    delete usernameExists._doc.userPassword;
    delete usernameExists._doc.refreshToken;
    delete usernameExists._doc.verifyToken;

    res.status(200).json({ ...usernameExists._doc, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const RequestVerifyEmail = async (req, res) => {
  try {
    const data = req.body;
    const emailExists = await DashboardUserAccount.findOne({ userEmail: data.email });
    if (!emailExists) return res.status(401).json({ message: "Email does not exist" });
    if (emailExists.isVerify) return res.status(401).json({ message: "Email is already verified" });
    if (emailExists.verifyToken) {
      const decoded = verifyEmailToken(emailExists.verifyToken);
      if (decoded) {
        verifyEmail(data.email, verifytoken);
        return res.status(200).json({ message: "Email sent" });
      }
    }
    const verifytoken = createEmailVerifyToken(emailExists._id);
    await DashboardUserAccount.findByIdAndUpdate(emailExists._id, { verifyToken: verifytoken });
    console.log("sending...");
    if (verifytoken) {
      verifyEmail(data.email, verifytoken);
    } else {
      return res.status(401).json({ message: "Failed to send email" });
    }
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const VerifyEmail = async (req, res) => {
  const data = req.body;
  try {
    console.log(req.body);
    const decoded = verifyEmailToken(data.token);
    const user = await DashboardUserAccount.findById(decoded.id);
    console.log(user, decoded);
    if (!user) return res.status(400).json({ message: "User does not exist" });
    await DashboardUserAccount.findByIdAndUpdate(user._id, { isVerify: true });

    const usernameExists = await DashboardUserAccount.findOne({ userEmail: user.userEmail });
    const token = createToken(usernameExists._id);
    const refreshToken = createRefreshToken(usernameExists._id);
    await DashboardUserAccount.findByIdAndUpdate(usernameExists._id, { refreshToken: refreshToken });
    delete usernameExists._doc.userPassword;
    delete usernameExists._doc.refreshToken;
    delete usernameExists._doc.verifyToken;

    res.status(200).json({ ...usernameExists._doc, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};
