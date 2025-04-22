const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../Models/Product');
const generatedId = require('../Controllers/generateID');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy sản phẩm' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // thư mục images/
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

/**
 * 📌 Route lấy ID mới dựa theo category
 * GET /api/products/next-id?category=Hình thú
 */
router.get("/next-id", generatedId.getNextProductId);

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { id, name, category, price, size, soluong, description } = req.body;

    const newProduct = new Product({
      id,
      name,
      category,
      price,
      size,
      soluong,
      description,
      image: req.file ? req.file.filename : null,
    });

    await newProduct.save();
    res.status(201).json({ message: "Tạo thành công", data: newProduct });
  } catch (err) {
    console.error("Lỗi khi thêm sản phẩm:", err);
    res.status(500).json({ error: "Lỗi server khi thêm sản phẩm" });
  }
});

module.exports = router;