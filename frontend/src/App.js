import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Introduce from "./pages/Introduce";
import ManageProducts from "./pages/ManageProducts";
import Login from "./pages/Login";
import ListUsers from "./pages/ListUsers";

// Thêm một số class Bootstrap để tạo kiểu
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar với Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              FallShop
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/news">
                    News
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/product/1">
                    Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/introduce">
                    Introduce
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage-products">
                    Manage Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listusers">
                    List Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Nội dung trang */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listusers" element={<ListUsers />} />
          </Routes>
        </div>
        {/* Footer */}
        <footer id="footer" className="footer bg-dark text-white py-5 mt-5">
          <div className="container">
            <div className="row">
              {/* Logo */}
              <div className="col-sm-3">
                <div className="widget mb-4">
                  <a href="/" id="logo">
                    <img
                      src="/images/avatar.png"
                      width="180px"
                      alt="Logo"
                      className="img-fluid"
                    />
                  </a>
                  <p className="mt-2">Mặc rộng, sống thoáng.</p>
                </div>
              </div>

              {/* Thông tin */}
              <div className="col-sm-3">
                <div className="widget mb-4">
                  <h4 className="widget-title text-uppercase mb-3">
                    Thông tin
                  </h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/" className="text-white text-decoration-none">
                        <i className="fa fa-chevron-right"></i> Trang chủ
                      </a>
                    </li>
                    <li>
                      <a
                        href="/product/1"
                        className="text-white text-decoration-none"
                      >
                        <i className="fa fa-chevron-right"></i> Sản phẩm
                      </a>
                    </li>
                    <li>
                      <a
                        href="/introduce"
                        className="text-white text-decoration-none"
                      >
                        <i className="fa fa-chevron-right"></i> Giới thiệu
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="text-white text-decoration-none"
                      >
                        <i className="fa fa-chevron-right"></i> Liên hệ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hỗ trợ */}
              <div className="col-sm-3">
                <div className="widget mb-4">
                  <h4 className="widget-title text-uppercase mb-3">Hỗ trợ</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/" className="text-white text-decoration-none">
                        <i className="fa fa-chevron-right"></i> Size Guide
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-white text-decoration-none">
                        <i className="fa fa-chevron-right"></i> Chính sách khách
                        hàng
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-white text-decoration-none">
                        <i className="fa fa-chevron-right"></i> Chính sách bảo
                        hành
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-white text-decoration-none">
                        <i className="fa fa-chevron-right"></i> Giao hàng -
                        thanh toán
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Địa chỉ */}
              <div className="col-sm-3">
                <div className="widget mb-4">
                  <h4 className="widget-title text-uppercase mb-3">Địa chỉ</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        href="https://www.google.com/maps"
                        className="text-white text-decoration-none"
                      >
                        <i className="fa fa-home"></i> 470 Đường Trần Đại Nghĩa,
                        Đà Nẵng
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+84917364860"
                        className="text-white text-decoration-none"
                      >
                        <i className="fa fa-phone"></i> 0917 364 860
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:info@gmail.com"
                        className="text-white text-decoration-none"
                      >
                        <i className="fa fa-envelope"></i> hieu.mh7@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>{" "}
            {/* .row */}
            {/* Footer Bottom */}
            <div className="footer-bottom text-center mt-4">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} FallShop. Tất cả quyền lợi
                được bảo lưu.
              </p>
            </div>
          </div>{" "}
          {/* .container */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
