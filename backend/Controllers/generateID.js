const Product = require("../Models/Product");

function getPrefix(category) {
  switch (category.trim()) {
    case "Hình thú":
      return "BEARHT";
    case "Hoạt hình":
      return "BEARHH";
    case "Phụ kiện":
      return "BEARPK";
    case "BEAR": // Nếu bạn muốn xử lý riêng BEAR
      return "BEAR";
    default:
      return "SP";
  }
}

exports.getNextProductId = async (req, res) => {
  const category = req.query.category;
  if (!category) {
    return res.status(400).json({ error: "Thiếu category" });
  }

  const prefix = getPrefix(category);
  console.log("▶️ Prefix được dùng:", prefix);

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

    console.log("🆔 ID tiếp theo được tạo:", nextId);
    res.json({ id: nextId });
  } catch (err) {
    console.error("❌ Lỗi khi tạo ID:", err);
    res.status(500).json({ error: "Lỗi khi tạo ID mới" });
  }
};
