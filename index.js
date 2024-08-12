import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";

// import mongoose
import mongoose from "mongoose";
import { connectToDatabase } from "./functions/ConnecttoDatabase.js";

// import routes
import DashboardUserRoutes from "./routes/DashboardUserRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import DesignCodeRoutes from "./routes/DesignCodeRoutes.js";
import SizeDetailRoutes from "./routes/SizeDetailRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// connect to database
connectToDatabase();

// routes
app.use("/DashboardUser", DashboardUserRoutes);
app.use("/category", CategoryRoutes);
app.use("/designCode", DesignCodeRoutes);
app.use("/sizeDetail", SizeDetailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
