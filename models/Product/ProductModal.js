import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  ThaiName: { type: String, required: true, unique: true },
  EnglishName: { type: String, required: true, unique: true },
  Description: { type: String, required: true, default: "--" },
  fabric: { type: Schema.Types.ObjectId, ref: "Fabric" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  designcode: { type: Schema.Types.ObjectId, ref: "DesignCode" },
  status: { type: String, required: true, default: "active", enum: ["active", "inactive", "draft"] },
  detail: { type: Array, required: true, default: [] },
  priceTHB: { type: Number, required: true },
  priceUSD: { type: Number, required: true },
  priceEUR: { type: Number, required: true },
  priceAED: { type: Number, required: true },
});

const Product = model("Product", ProductSchema);

export default Product;
