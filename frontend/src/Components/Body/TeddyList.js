import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeddyList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const teddyProducts = res.data
          .filter(product => product.id && product.id.includes("BEARHT"))
          .slice(0, 4);
        setProducts(teddyProducts);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="product-section">
      <h2 className="title">GẤU BÔNG TEDDY</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={`/image/${product.image}`}
              alt={product.name}
              className="product-image"
            />
            <h5 className="product-name">{product.name}</h5>
            <p className="product-price">{product.price.toLocaleString()}₫</p>
            <div className="product-size">
              <span className="size-badge">{product.size}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="btn-more-container">
        <button className="btn-more">XEM THÊM</button>
      </div>
    </div>
  );
};

export default TeddyList;
