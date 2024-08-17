import { v6 as uuid } from "uuid";
import SizeDetail from "../../../models/Product/SizeDetail.js";
import Size from "../../../models/Product/SizeModal.js";

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

export const readAllSize = async (req, res) => {
  try {
    const data = await Size.find({ sizeStatus: "active" });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSize = async (req, res) => {
  try {
    const sizeExists = await Size.findOne({ size: req.body.size });
    if (sizeExists) return res.status(400).json({ message: "มีขนาดนี้ในระบบแล้ว" });
    const newSize = new Size({
      size: req.body.size,
      sizeToken: uuid(),
    });
    await newSize.save();
    res.status(201).json(newSize);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
