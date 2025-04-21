import Logo from "../../Assets/Images/tedbud.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
      <>
        <div className="header">
          <div className="header-container">
            <div className="logo-wrapper">
              <Link to="/">
                <img src={Logo} alt="TedBud Logo" />
              </Link>
            </div>
  
            <div className="right-group">
              <div className="search-bar">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
              </div>
              <button className="btn-search">
                <i className="fas fa-search"></i>
              </button>
              <div className="contact-info">
                <i className="fas fa-phone-alt"></i>
                <span>0978 677 271</span>
              </div>
            </div>
          </div>
        </div>
  
        <div className="nav">
          <Link to="/">TRANG CHỦ</Link>
          <Link to="/gau-teddy">GẤU TEDDY</Link>
          <Link to="/gau-hoat-hinh">GẤU BÔNG HOẠT HÌNH</Link>
          <Link to="/thu-bong">THÚ BÔNG</Link>
          <Link to="/phu-kien">GẤU BÔNG & PHỤ KIỆN</Link>
          <Link to="/beni-bear">BENI BEAR CÓ GÌ?</Link>
          <Link to="/tat-ca">TẤT CẢ SP</Link>
        </div>
      </>
    );
  };

export default Header;
