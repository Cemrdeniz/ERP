const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

// ürünleri getir
router.get("/", async (req, res) => {

  const products = await Product.find();

  res.json(products);
});

// ürün ekle
router.post("/", async (req, res) => {

  const newProduct = new Product(req.body);

  await newProduct.save();

  res.json(newProduct);
});

// ürün sil
router.delete("/:id", async (req, res) => {

  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Ürün silindi",
  });
});

module.exports = router;