import { Schema, model } from "mongoose";

const ProductTagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true, default: "active", enum: ["active", "inactive", "draft"] },
  ProductArray: { type: Array, required: true, default: [] },
});

const ProductTag = model("ProductTag", ProductTagSchema);

export default ProductTag;
