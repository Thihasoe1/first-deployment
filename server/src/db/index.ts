import mongoose from "mongoose";

export const connectDB = async () => {
  let DB_CONNECTION_STRING: string | undefined;
  const MODE_ENV = process.env.MODE_ENV;
  const MONGO_URL = process.env.MONGO_URL;
  const MONGO_LOCAL_URL = process.env.MONGO_LOCAL_URL;

  try {
    if (MODE_ENV == "development") {
      DB_CONNECTION_STRING = MONGO_LOCAL_URL;
    }
    if (MODE_ENV == "production") {
      DB_CONNECTION_STRING = MONGO_URL;
    }
    await mongoose
      .connect(DB_CONNECTION_STRING!)
      .then(() => {
        console.log("db connected successfully");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
