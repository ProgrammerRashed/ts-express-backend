import mongoose from "mongoose";
import app from "./app";
import config from "./config";
async function server() {
  try {
    await mongoose.connect(config.MONGODB_URI as string);
    app.listen(config.PORT, () => {
      console.log("Server is up and running on", config.PORT);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

server();
