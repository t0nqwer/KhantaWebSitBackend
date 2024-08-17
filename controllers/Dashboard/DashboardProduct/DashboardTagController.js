import ProductTag from "../../../models/Product/ProductTag.js";

export const getTags = async (req, res) => {
  try {
    const tags = await ProductTag.find();
    res.status(200).json({ tags });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = await ProductTag.create({ name });
    res.status(201).json({ tag });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
