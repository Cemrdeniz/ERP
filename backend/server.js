const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/products", productRoutes);

// mongo bağlantısı
mongoose
  .connect("mongodb://127.0.0.1:27017/miniERP")
  .then(() => {
    console.log("MongoDB connected");
  });

app.listen(5000, () => {
  console.log("Server running");
});