import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function CreateProduct() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    size: "",
    price: "",
    soluong: "",
    image: null,
  });

  const [generatedId, setGeneratedId] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "category" && value) {
        fetchGeneratedId(value);
      }
    }
  };

  const fetchGeneratedId = async (category) => {
    try {
      const res = await axios.get(`${API_URL}/products/next-id?category=${encodeURIComponent(category)}`);
      setGeneratedId(res.data.id);
      setFormData((prev) => ({ ...prev, id: res.data.id }));
    } catch (err) {
      console.error("Không thể lấy ID mới:", err);
      setGeneratedId("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axios.post(`${API_URL}/products/create`, data);
      setMessage(`✔️ Tạo thành công: ${res.data.id}`);

      // Reset form
      setFormData({
        id: "",
        name: "",
        category: "",
        description: "",
        size: "",
        price: "",
        soluong: "",
        image: null,
      });
      setGeneratedId("");
    } catch (err) {
      console.error("Lỗi khi tạo sản phẩm:", err);
      setMessage("❌ Tạo thất bại. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Tạo sản phẩm Gấu bông</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Mã sản phẩm (ID)</label>
          <input
            type="text"
            className="form-control"
            value={generatedId}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Tên gấu</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Phân loại</label>
          <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">-- Chọn phân loại --</option>
            <option value="Hình thú">Hình thú</option>
            <option value="Hoạt hình">Hoạt hình</option>
            <option value="Phụ kiện">Phụ kiện</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Mô tả</label>
          <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Kích thước</label>
          <input type="text" className="form-control" name="size" value={formData.size} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Giá</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Số lượng</label>
          <input type="number" className="form-control" name="soluong" value={formData.soluong} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Ảnh (chọn từ máy)</label>
          <input type="file" className="form-control" name="image" onChange={handleChange} accept="image/*" />
        </div>

        <button type="submit" className="btn btn-primary">Lưu</button>
      </form>
    </div>
  );
}

export default CreateProduct;
