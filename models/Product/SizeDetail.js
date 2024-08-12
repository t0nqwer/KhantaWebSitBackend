import { Schema, model } from "mongoose";

const SizeDetailSchema = new Schema({
  sizeDetailThai: { type: String, required: true, unique: true },
  sizeDetailEnglish: { type: String, required: true, unique: true },
  sizeDetailDescription: { type: String, required: true, default: "--" },
  sizeDetailToken: { type: String, required: true, unique: true },
});

const SizeDetail = model("SizeDetail", SizeDetailSchema);

export default SizeDetail;
