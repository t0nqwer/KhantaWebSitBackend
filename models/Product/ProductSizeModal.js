import { Schema, model } from "mongoose";

const ProductSizeSchema = new Schema({
  SizeDetail: { type: Schema.Types.ObjectId, ref: "SizeDetail" },
  size: { type: Schema.Types.ObjectId, ref: "Size" },
  quantity: { type: Number, required: true },
});

const ProductSize = model("ProductSize", ProductSizeSchema);
export default ProductSize;
