// backend/routes/admin.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db"); // Kết nối DB
const bcrypt = require("bcrypt");

const SECRET_KEY =
  "09fc14f045ed3c5c3756951ca04f1ac8df2bb3383e1537386ba76b1ab445316d961da7083f022e5b7620b7856bff70d4227cb20bb6a990844c1d5a411c395cf0"; // Đổi bằng secret key của bạn
// Tạo middleware xác thực và kiểm tra vai trò
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Permission denied" });
    }
    req.user = decoded; // Lưu thông tin user vào req để sử dụng tiếp
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Route login admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM admin WHERE email = ?", [email]);
    const admin = rows[0];

    if (admin && bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign(
        { adminId: admin.id, role: "admin" }, // Thêm role vào JWT
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route admin chỉ admin mới được truy cập
router.get("/homepageadmin", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;
