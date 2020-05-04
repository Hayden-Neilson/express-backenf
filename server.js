require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT | 4000;
const app = express();

const todoRoutes = require("./routes/todoRoutes");

mongoose.connect(
  "mongodb://localhost:27017/todo-db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Error connecting db" + err);
    } else {
      console.log("connected to db");
    }
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", todoRoutes);

app.listen(port, () => {
  console.log(`server running ${port}`);
});
