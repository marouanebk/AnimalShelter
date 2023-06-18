const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
// const dbConfig = require("./config/db.config");
const session = require('express-session');
const cors = require("cors");



// mongoose.set('strictQuery', true);



mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://0.0.0.0:27017/eCommerce", {
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
// const MongoDBStore = require('connect-mongodb-session')(session);

// const store = new MongoDBStore({
//   uri: 'mongodb://0.0.0.0:27017/eCommerce_fitness',
//   collection: 'sessions'
// });

// store.on('error', (err) => {
//   console.log(`Session store error: ${err}`);
// });


app.use(express.json());
app.use(cors());

app.use("/products", require("./routes/productController"));

// middleware for error responses
// app.use(errors.errorHandler);

// listen for requests
let port = 4000;
const server = app.listen(port, function () {
  console.log("server running on port ", port);
});
