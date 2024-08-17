import { Schema, model } from "mongoose";

const SizeSchem = new Schema({
  size: { type: String, required: true, unique: true },
  sizeToken: { type: String, required: true, unique: true },
  sizeStatus: { type: String, required: true, default: "active", enum: ["active", "inactive"] },
});

const Size = model("Size", SizeSchem);

export default Size;
