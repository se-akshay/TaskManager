const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./connection/conn");
const userApis = require("./controllers/user");
const taskApis = require("./controllers/task");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from server...");
});

app.use("/api/v1", userApis);
app.use("/api/v1", taskApis);

app.listen(`${process.env.PORT}`, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
