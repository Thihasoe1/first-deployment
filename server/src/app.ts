import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import todoRoutes from "./routes/todo.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());

app.use(todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING ${PORT}`);
});
