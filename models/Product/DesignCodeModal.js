import { Schema, model } from "mongoose";

const DesignCodeSchema = new Schema({
  designCodeName: { type: String, required: true, unique: true },
  designCodeDescription: { type: String, required: true, default: "--" },
  designCodeCreatedAt: { type: Date, default: Date.now },
  designCodeCreateBy: { type: String, required: true, default: "Dev" },
  designCodeStatus: { type: String, required: true, default: "active" },
  designCodeToken: { type: String, required: true, unique: true },
});

const DesignCode = model("DesignCode", DesignCodeSchema);

export default DesignCode;
