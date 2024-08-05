import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  categoryThaiName: { type: String, required: true, unique: true },
  categoryEnglishName: { type: String, required: true, unique: true },
  categoryDescription: { type: String, required: true, default: "--" },
  categoryCreatedAt: { type: Date, default: Date.now },
  categoryCreateBy: { type: String, required: true, default: "Dev" },
  categoryStatus: { type: String, required: true, default: "active" },
  categoryToken: { type: String, required: true, unique: true },
});

const Category = model("Category", CategorySchema);

export default Category;
