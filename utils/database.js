import mongoose from "mongoose";

let isConnected = false; //Check the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose.set("debug", true);

  if (isConnected) {
    console.log("MongoDB is connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "promptopia",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;

    console.log("Mongodb connected");
  } catch (error) {
    console.log(error.message);
  }
};
