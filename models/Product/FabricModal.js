import { Schema, model } from "mongoose";

const FabricSchema = new Schema({
  fabricThaiName: { type: String, required: true, unique: true },
  fabricEnglishName: { type: String, required: true, unique: true },
  Description: { type: String, required: true, default: "--" },
  status: { type: String, required: true, default: "active", enum: ["active", "inactive", "draft"] },
});

const Fabric = model("Fabric", FabricSchema);

export default Fabric;
