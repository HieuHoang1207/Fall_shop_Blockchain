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
      </div>
    </Router>
  );
}

export default App;
