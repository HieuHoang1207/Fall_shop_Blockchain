const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Kiểm tra quyền admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.admin = decoded; // Gán thông tin admin vào request
    next(); // Cho phép tiếp tục
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateAdmin;
