// app.js
const express = require("express");
const { ethers } = require("ethers");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const Marketplace = require("./artifacts/contracts/Marketplace.sol/Marketplace.json");
const db = require("./db"); // Đảm bảo bạn đã cấu hình đúng kết nối trong db.js

const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

const marketplaceAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const marketplace = new ethers.Contract(
  marketplaceAddress,
  Marketplace.abi,
  provider
);

// API thêm người dùng vào MySQL
app.post("/api/users", (req, res) => {
  const { userId, username, email, walletAddress } = req.body;

  // Kiểm tra xem các trường dữ liệu đã được cung cấp đầy đủ chưa
  if (!userId || !username || !email || !walletAddress) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "INSERT INTO users (userId, username, email, walletAddress) VALUES (?, ?, ?, ?)";

  // Dùng db.query() thay vì connection.query() nếu bạn đã xuất đối tượng db từ file db.js
  db.query(query, [userId, username, email, walletAddress], (err, results) => {
    if (err) {
      console.error("Error inserting user into MySQL:", err);
      res.status(500).json({ error: "Failed to save user to database" });
    } else {
      res.status(200).json({ message: "User saved successfully" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
