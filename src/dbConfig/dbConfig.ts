import mongoose from "mongoose";

export async function connect() {
  try {
    // mongoose.connect(process.env.MONGO_URL || "");
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    connection.on("error", (err) => {
      console.log(err);
      process.exit(); // --> You can see this in chai-aur-code Backend Series
    });
  } catch (err) {
    console.log("Something went wrong in connecting to DB");
    console.log(err);
  }
}
