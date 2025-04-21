// src/Pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    sdt: '',
    password: '',
    diachi: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Lỗi đăng ký!');
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Đăng ký tài khoản</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Mã người dùng</label>
          <input type="text" name="id" className="form-control" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Tên đăng nhập</label>
          <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input type="text" name="sdt" className="form-control" value={formData.sdt} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Địa chỉ</label>
          <input type="text" name="diachi" className="form-control" value={formData.diachi} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mật khẩu</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
