const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../Models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy sản phẩm' });
  }
});

// Cấu hình lưu ảnh với Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// ✅ HÀM TẠO PREFIX ID DỰA TRÊN CATEGORY
function getPrefix(category) {
  switch (category) {
    case "Hình thú":
      return "HT";
    case "Hoạt hình":
      return "HH";
    case "Phụ kiện":
      return "PK";
    default:
      return "SP";
  }
}

// ✅ LẤY ID MỚI TỰ ĐỘNG
router.get("/next-id", async (req, res) => {
  const category = req.query.category;
  if (!category) {
    return res.status(400).json({ error: "Thiếu category" });
  }

  const prefix = getPrefix(category);

  try {
    const lastProduct = await Product.find({ id: new RegExp(`^${prefix}`) })
      .sort({ id: -1 })
      .limit(1);

    let nextId;
    if (lastProduct.length > 0) {
      const lastIdNum = parseInt(lastProduct[0].id.replace(prefix, ""));
      const newNum = (lastIdNum + 1).toString().padStart(4, "0");
      nextId = `${prefix}${newNum}`;
    } else {
      nextId = `${prefix}0001`;
    }

    res.json({ id: nextId });
  } catch (err) {
    console.error("Lỗi tạo ID mới:", err);
    res.status(500).json({ error: "Lỗi khi tạo ID mới" });
  }
});

// ✅ THÊM SẢN PHẨM MỚI
router.post("/", upload.single("image"), async (req, res) => {
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