const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const conn = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Database Connected");
  } catch (e) {
    // console.log(e);
    console.log("Database Not Connected");
  }
};

conn();
