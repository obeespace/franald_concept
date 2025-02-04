import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect("mongodb+srv://obeewon20:DsIMP8jyGezRSD2e@cluster0.ipck4.mongodb.net/mydatabase?retryWrites=true&w=majority");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectDb;
