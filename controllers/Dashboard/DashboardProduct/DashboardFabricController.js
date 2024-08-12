import Fabric from "../../../models/Product/FabricModal.js";

export const readAllFabric = async (req, res) => {
  try {
    const data = await Fabric.find({ status: "active" });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createFabric = async (req, res) => {
  try {
    const fabricExists = await Fabric.findOne({ fabricThaiName: req.body.fabricThaiName });
    if (fabricExists) return res.status(400).json({ message: "มีผ้านี้ในระบบแล้ว" });
    const newFabric = new Fabric({
      fabricThaiName: req.body.fabricThaiName,
      fabricEnglishName: req.body.fabricEnglishName,
      Description: req.body.Description,
    });
    await newFabric.save();
    res.status(201).json(newFabric);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
