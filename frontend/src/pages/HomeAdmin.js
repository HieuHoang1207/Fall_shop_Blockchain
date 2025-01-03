//pages\HomeAdmin.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ethers } from "ethers";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

// Components for routes
import ManageProducts from "./ManageProducts";
import ListUsers from "./ListUsers";
import HomePageAdmin from "./HomePageAdmin";
import PrivateRoute from "../component/PrivateRoute";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          Marketplace.abi,
          signer
        );

        // Fetch users
        const userCount = await contract.userCount();
        const usersArray = [];
        for (let i = 1; i <= userCount; i++) {
          const user = await contract.users(i);
          usersArray.push({
            userId: user.userId.toString(),
            username: user.username,
            email: user.email,
            walletAddress: user.walletAddress,
          });
        }
        setUsers(usersArray);

        // Fetch products
        const productCount = await contract.productCount();
        const productsArray = [];
        for (let i = 1; i <= productCount; i++) {
          const product = await contract.products(i);
          productsArray.push(product);
        }
        setProducts(productsArray);

        // Fetch news
        const newsCount = await contract.getNewsCount();
        const newsArray = [];
        for (let i = 1; i <= newsCount; i++) {
          const newsItem = await contract.getNews(i);
          newsArray.push(newsItem);
        }
        setNews(newsArray);
      } catch (error) {
        console.error("Error fetching data from contract:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/admin/homepageadmin">
            AdminPanel
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/homepageadmin">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/manage-products">
                  Manage Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/listusers">
                  List Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/homepageadmin"
          element={<PrivateRoute element={<HomePageAdmin />} />}
        />
        <Route
          path="/manage-products"
          element={<PrivateRoute element={<ManageProducts />} />}
        />
        <Route
          path="/listusers"
          element={<PrivateRoute element={<ListUsers />} />}
        />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
