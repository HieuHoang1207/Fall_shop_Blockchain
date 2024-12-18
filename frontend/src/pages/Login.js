//frontend\src\pages\Login.js
import React, { useState } from "react";
import { ethers } from "ethers";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json"; // Đường dẫn tới ABI của smart contract
import saveUserToDatabase from "../component/saveUserToDatabase";

const Login = () => {
  const [address, setAddress] = useState(null);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setMessage("Please install MetaMask!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Kết nối MetaMask
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();

      setAddress(walletAddress);
      const contract = new ethers.Contract(
        contractAddress,
        Marketplace.abi,
        signer
      );

      // Kiểm tra nếu user đã đăng ký
      const registered = await contract.isUserRegistered(walletAddress);
      setIsRegistered(registered);

      if (registered) {
        setMessage("Login successful!");
      } else {
        setMessage("Please register to continue.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to wallet.");
    }
  };

  const registerUser = async () => {
    try {
      if (!username || !email) {
        setMessage("Please enter both username and email.");
        return;
      }

      // Kết nối với Ethereum và smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        Marketplace.abi,
        signer
      );

      // Gọi hàm registerUser trên smart contract
      const tx = await contract.registerUser(username, email, address);
      await tx.wait();

      // Lấy userId vừa tạo ra từ contract
      const userCount = await contract.userCount();
      const user = await contract.users(userCount);

      // Tạo object người dùng để lưu vào cơ sở dữ liệu
      const userInfo = {
        userId: user.userId.toString(),
        username: user.username,
        email: user.email,
        walletAddress: user.walletAddress,
      };

      // Gọi API để lưu vào database
      await saveUserToDatabase(userInfo);

      // Cập nhật giao diện
      setMessage("Registration successful! You are now logged in.");
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
      setMessage("Error during registration.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page</h2>
      {address ? (
        <p>Connected wallet: {address}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}

      {message && <p>{message}</p>}

      {!isRegistered && address && (
        <div>
          <h3>Register</h3>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ display: "block", margin: "10px 0" }}
          />
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", margin: "10px 0" }}
          />
          <button onClick={registerUser}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Login;
