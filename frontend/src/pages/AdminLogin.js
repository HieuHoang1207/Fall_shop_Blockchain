//frontend\src\pages\AdminLogin.js
import React, { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Lưu token
        setMessage("Login successful!");
        window.location.href = "/admin/homepageadmin"; // Chuyển hướng
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error during login.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px 0" }}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0" }}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
