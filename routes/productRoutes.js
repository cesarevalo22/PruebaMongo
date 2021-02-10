const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

//POST /adproduct  - insert ad product Record

router.post("/adproduct", productController.createProduct);

module.exports = router;