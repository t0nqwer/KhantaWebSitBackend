import DesignCode from "../../../models/Product/DesignCodeModal.js";
import Product from "../../../models/Product/ProductModal.js";
import { v6 as uuid } from "uuid";

export const readAllDesignCode = async (req, res) => {
  try {
    const data = await DesignCode.find({ designCodeStatus: "active" });

    // find product in design code
    const findProduct = data.map(async (designCode) => {
      const product = await Product.countDocuments({ designcode: designCode._id }).sort({ designCodeName: 1 });
      return { ...designCode._doc, productCount: product };
    });
    const result = await Promise.all(findProduct);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDesignCode = async (req, res) => {
  try {
    // check if design code already exists
    const designCodeExists = await DesignCode.findOne({ designCodeName: req.body.designCode });
    if (designCodeExists?.designCodeStatus === "active")
      return res.status(400).json({ message: "มีรหัสนี้ในระบบแล้ว" });

    // if it is inactive, update it to active
    if (designCodeExists?.designCodeStatus === "inactive") {
      await DesignCode.findByIdAndUpdate(designCodeExists._id, {
        designCodeStatus: "active",
        designCodeName: req.body.designCode,
        designCodeDescription: req.body.designCodeDescription,
      });
      return res.status(200).json({ message: "Design code create successfully" });
    }
    console.log(req.body);

    const newDesignCode = new DesignCode({
      designCodeName: req.body.designCode.toLowerCase(),
      designCodeDescription: req.body.designCodeDescription,
      designCodeToken: uuid(),
    });
    await newDesignCode.save();
    res.status(201).json(newDesignCode);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
