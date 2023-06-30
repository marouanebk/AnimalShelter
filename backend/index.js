const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://0.0.0.0:27017/AnimalShelter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );
app.use(express.json());
app.use(cors());

// app.use("/products", require("./routes/productController"));
app.use("/users", require("./routes/userRouter"));
app.use("/", require("./routes/adsRoutes"));

let port = 4000;
const server = app.listen(port, function () {
  console.log("server running on port ", port);
});
