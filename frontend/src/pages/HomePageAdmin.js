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
        // Fetch products
        const productCount = await contract.productCount();
        const productsArray = [];
        for (let i = 1; i <= productCount; i++) {
          const product = await contract.products(i);
          productsArray.push(product);
        }
        setProducts(productsArray);
        // Fetch users
        const userCount = await contract.userCount();
        const usersArray = [];
        for (let i = 1; i <= userCount; i++) {
          const user = await contract.users(i);
          usersArray.push(user);
        }
        setUsers(usersArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h4 className="card-title">Total Products</h4>
              <p className="display-4">{products.length}</p>
              <Link to="/admin/manage-products" className="btn btn-success">
                Manage Products
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h4 className="card-title">Total Users</h4>
              <p className="display-4">{users.length}</p>
              <Link to="/admin/listusers" className="btn btn-primary">
                View Users
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
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
    </div>
  );
};

export default AdminDashboard;
