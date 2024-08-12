import { v6 as uuid } from "uuid";
import SizeDetail from "../../../models/Product/SizeDetail.js";

export const readAllSizeDetail = async (req, res) => {
  try {
    const data = await SizeDetail.find({ sizeDetailStatus: "active" });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSizeDetail = async (req, res) => {
  try {
    const sizeDetailExists = await SizeDetail.findOne({ sizeDetailThai: req.body.sizeDetailThai });
    if (sizeDetailExists) return res.status(400).json({ message: "มีขนาดนี้ในระบบแล้ว" });
    const newSizeDetail = new SizeDetail({
      sizeDetailThai: req.body.sizeDetailThai,
      sizeDetailEnglish: req.body.sizeDetailEnglish,
      sizeDetailDescription: req.body.sizeDetailDescription,
      sizeDetailToken: uuid(),
    });
    await newSizeDetail.save();
    res.status(201).json(newSizeDetail);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
