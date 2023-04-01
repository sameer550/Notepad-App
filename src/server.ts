import mongoose from "mongoose";
import app from "./app";
import env from "../src/util/validateEnv";

const PORT = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose is connected");
    app.listen(PORT, () => {
      console.log(`Server is running successfully on ${PORT}`);
    });
  })
  .catch(console.error);
