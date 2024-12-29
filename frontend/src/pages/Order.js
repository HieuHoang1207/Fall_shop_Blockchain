import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyer, setBuyer] = useState(null);

  const productIds = [1, 2]; // Giả sử productId là 1 và 2
  const buyerId = 12; // Giả sử ID người mua là 12
  const contractAddress = "0xaE7b7A1c6C4d859e19301ccAc2C6eD28A4C51288"; // Địa chỉ hợp đồng

  useEffect(() => {
    const fetchProductsAndBuyer = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            Marketplace.abi,
            signer
          );

          // Lấy thông tin sản phẩm
          const fetchedProducts = await Promise.all(
            productIds.map(async (id) => {
              const product = await contract.products(id);
              return {
                id,
                name: product.name,
                price: ethers.utils.formatEther(product.price),
                imageURL: product.imageURL,
                description: product.description,
              };
            })
          );

          // Lấy thông tin người mua
          const user = await contract.users(buyerId);
          const buyerInfo = {
            userId: user.userId.toString(),
            username: user.username,
            email: user.email,
            walletAddress: user.walletAddress,
          };

          setProducts(fetchedProducts);
          setBuyer(buyerInfo);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    };

    fetchProductsAndBuyer();
  }, []);

  const calculateTotal = () => {
    return products
      .reduce((total, product) => total + parseFloat(product.price), 0)
      .toFixed(3); // Tổng cũng sẽ theo đơn vị mới (0.001)
  };

  const handleCheckout = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          Marketplace.abi,
          signer
        );

        const total = calculateTotal();
        const tx = await contract.checkout(productIds, {
          value: ethers.utils.parseEther(total.toString()),
        });

        await tx.wait();
        alert("Order placed successfully!");
      } catch (error) {
        console.error("Checkout error:", error);
        alert("Failed to place order: " + error.message);
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">Order Summary</h1>

      {/* Hiển thị thông tin người mua */}
      {buyer && (
        <div className="buyer-info card p-3 mb-4">
          <h4>Buyer Information</h4>
          <p>
            <strong>Name:</strong> {buyer.username}
          </p>
          <p>
            <strong>Email:</strong> {buyer.email}
          </p>
          <p>
            <strong>Wallet:</strong> {buyer.walletAddress}
          </p>
          <h5 className="mt-3">Shipping Address:</h5>
          <p>
            <strong>Address:</strong> 470 Đường Trần Đại Nghĩa, Đà Nẵng
          </p>
          <p>
            <strong>Phone:</strong> 0917 364 860
          </p>
        </div>
      )}

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 mb-4">
            <div className="card shadow-sm d-flex flex-row">
              {/* Phần ảnh bên trái */}
              <div
                className="card-img-wrapper"
                style={{
                  position: "relative",
                  width: "200px", // Chiều rộng cố định cho ảnh
                  paddingTop: "40%", // Giữ tỷ lệ ảnh với padding-top
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.imageURL}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>

              {/* Phần thông tin bên phải */}
              <div
                className="card-body d-flex flex-column justify-content-between"
                style={{ width: "calc(100% - 200px)" }}
              >
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="text-success">Price: {product.price} ETH</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <h2>Total: {calculateTotal()} ETH</h2>
        <button
          className="btn btn-primary btn-lg mt-3"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Order;
