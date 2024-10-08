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
import FabricRoutes from "./routes/FabricRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import ProductTagRoutes from "./routes/TagRoutes.js";
import { io } from "./socket.io/socketio.js";

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
app.use("/fabric", FabricRoutes);
app.use("/product", ProductRoutes);
app.use("/productTag", ProductTagRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5050;
 
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

io.attach(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
