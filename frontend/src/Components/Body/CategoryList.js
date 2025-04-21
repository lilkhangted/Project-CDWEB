import React from "react";
import { Link } from "react-router-dom";

import gauHoatHinh from "../../Assets/Images/cat-hoathinh.png";
import gauTeddy from "../../Assets/Images/cat-teddy.png";
import gauHinhThu from "../../Assets/Images/cat-hinhthu.png";
import goiCoPhuKien from "../../Assets/Images/cat-goico.png";

const categories = [
  {
    title: "GẤU BÔNG HOẠT HÌNH",
    image: gauHoatHinh,
    path: "/gau-hoat-hinh"
  },
  {
    title: "GẤU BÔNG TEDDY",
    image: gauTeddy,
    path: "/gau-teddy"
  },
  {
    title: "GẤU BÔNG HÌNH THÚ",
    image: gauHinhThu,
    path: "/thu-bong"
  },
  {
    title: "GỐI CỔ PHỤ KIỆN",
    image: goiCoPhuKien,
    path: "/phu-kien"
  }
];

const CategoryList = () => {
  return (
    <div className="category-list">
      {categories.map((cat, index) => (
        <Link
          to={cat.path}
          key={index}
          className="category-item"
        >
          <img src={cat.image} alt={cat.title} className="cate-img" />
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
