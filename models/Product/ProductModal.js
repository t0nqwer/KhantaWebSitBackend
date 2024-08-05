import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  ThaiName: { type: String, required: true, unique: true },
  EnglishName: { type: String, required: true, unique: true },
  Description: { type: String, required: true, default: "--" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  status: { type: String, required: true, default: "active", enum: ["active", "inactive", "draft"] },
});

const Product = model("Product", ProductSchema);

export default Product;
