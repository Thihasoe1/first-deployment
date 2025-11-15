import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.ts";
import todoRoutes from "./routes/todo.ts";
import userRoute from "./routes/user.ts";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.ts";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());
app.use(cookieParser());

app.use(userRoute);
app.use(todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING ${PORT}`);
});
