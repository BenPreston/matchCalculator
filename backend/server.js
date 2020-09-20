const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", () => {
  console.error("Didn't connect to MongoDB");
});

connection.once("open", () => {
  console.log("Connected to mongo db");
});

const port = process.env.PORT || 2002;

app.listen(port, () => {
  console.log(`Port started on: ${port}`);
});
