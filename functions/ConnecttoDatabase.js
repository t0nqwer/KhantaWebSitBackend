import mongoose from "mongoose";
let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongoose already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "KhwantaEcommerce",
    });
    isConnected = true;
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
};
