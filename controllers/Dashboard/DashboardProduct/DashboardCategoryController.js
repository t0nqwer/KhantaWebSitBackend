import Category from "../../../models/Product/CategoryModal.js";
import Product from "../../../models/Product/ProductModal.js";
import { v6 as uuid } from "uuid";
export const readAllCategory = async (req, res) => {
  try {
    const data = await Category.find({ categoryStatus: "active" });
    // find product in category
    const findProduct = data.map(async (category) => {
      const product = await Product.countDocuments({ category: category._id });
      return { ...category._doc, productCount: product };
    });
    const result = await Promise.all(findProduct);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    // check if category already exists
    const categoryExists = await Category.findOne({ categoryEnglishName: req.body.categoryEnglishName });
    const categoryExistsThai = await Category.findOne({ categoryThaiName: req.body.categoryThaiName });
    if (categoryExists?.categoryStatus === "active" || categoryExistsThai?.categoryStatus === "active")
      return res.status(400).json({ message: "Category already exists" });
    // if it is inactive, update it to active
    if (categoryExists?.categoryStatus === "inactive" || categoryExistsThai?.categoryStatus === "inactive") {
      if (categoryExists) {
        await Category.findByIdAndUpdate(categoryExists._id, {
          categoryStatus: "active",
          categoryEnglishName: req.body.categoryEnglishName,
          categoryThaiName: req.body.categoryThaiName,
        });
      } else {
        await Category.findByIdAndUpdate(categoryExistsThai._id, {
          categoryStatus: "active",
          categoryEnglishName: req.body.categoryEnglishName,
          categoryThaiName: req.body.categoryThaiName,
        });
      }
      return res.status(200).json({ message: "Category create successfully" });
    }
    const newCategory = new Category({ ...req.body, categoryToken: uuid() });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    // check if category has product
    const product = await Product.findOne({ category: id });
    if (product) return res.status(400).json({ message: "Category has product" });
    await Category.findByIdAndUpdate(id, { categoryStatus: "inactive" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
