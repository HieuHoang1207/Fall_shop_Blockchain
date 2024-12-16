import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm để gửi thông tin người dùng vào database qua API
  const saveUserToDatabase = async (user) => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to database");
      }
      console.log("User saved to database successfully");
    } catch (error) {
      console.error("Error saving user to database:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (window.ethereum) {
        try {
          // Kết nối với Ethereum và hợp đồng
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []); // Yêu cầu người dùng kết nối MetaMask nếu chưa kết nối
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Địa chỉ hợp đồng Marketplace
            Marketplace.abi,
            signer
          );

          // Lấy tổng số người dùng
          const userCount = await contract.userCount();
          const usersArray = [];

          // Lấy thông tin từng người dùng và gửi vào database
          for (let i = 1; i <= userCount; i++) {
            const user = await contract.users(i);
            const userInfo = {
              userId: user.userId.toString(),
              username: user.username,
              email: user.email,
              walletAddress: user.walletAddress,
            };
            usersArray.push(userInfo);

            // Lưu vào database
            await saveUserToDatabase(userInfo);
          }

          setUsers(usersArray);
          setLoading(false);
        } catch (error) {
          console.error(
            "There was an error fetching the users from the contract!",
            error
          );
          setLoading(false);
        }
      } else {
        alert("MetaMask is not installed");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>List Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Wallet Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.walletAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListUsers;
