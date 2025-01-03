import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [orders, setOrders] = useState([]);
  const [productPrices, setProductPrices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
      fetchProductPrices(savedOrders);
    };

    const fetchProductPrices = async (orders) => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            process.env.REACT_APP_CONTRACT_ADDRESS,
            Marketplace.abi,
            signer
          );

          const prices = {};
          for (const order of orders) {
            const product = await contract.products(order.productId);
            prices[order.productId] = ethers.utils.formatEther(product.price);
          }
          setProductPrices(prices);
        } catch (error) {
          console.error("Error fetching product prices:", error);
        }
      }
    };

    fetchOrders();
  }, []);

  const handleCheckout = async () => {
    if (window.ethereum && orders.length > 0) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          Marketplace.abi,
          signer
        );

        let totalValue = ethers.BigNumber.from(0);

        for (const order of orders) {
          const priceInEth = ethers.utils.parseEther(
            productPrices[order.productId] || "0"
          );
          totalValue = totalValue.add(priceInEth);
        }

        const tx = await contract.buyMultipleProducts(
          orders.map((order) => order.productId),
          {
            value: totalValue,
          }
        );
        await tx.wait();

        alert("Order placed successfully!");
        localStorage.removeItem("orders");
        setOrders([]);
        navigate("/");
      } catch (error) {
        console.error("Checkout error:", error);
        alert("Failed to place order: " + error.message);
      }
    } else {
      alert("No orders to checkout.");
    }
  };

  const handleRemoveOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleClearOrders = () => {
    setOrders([]);
    localStorage.removeItem("orders");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">Order Summary</h1>

      <div className="buyer-info card p-3 mb-4">
        <h4>Buyer Information</h4>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={buyerInfo.name}
          onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={buyerInfo.email}
          onChange={(e) =>
            setBuyerInfo({ ...buyerInfo, email: e.target.value })
          }
        />
        <textarea
          className="form-control mb-3"
          placeholder="Shipping Address"
          value={buyerInfo.address}
          onChange={(e) =>
            setBuyerInfo({ ...buyerInfo, address: e.target.value })
          }
        />
        <input
          type="tel"
          className="form-control mb-3"
          placeholder="Phone Number"
          value={buyerInfo.phone}
          onChange={(e) =>
            setBuyerInfo({ ...buyerInfo, phone: e.target.value })
          }
        />
      </div>
      <div className="row">
        {orders.map((order, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow-sm d-flex flex-row">
              {/* Phần ảnh bên trái */}
              <div
                className="card-img-wrapper"
                style={{
                  position: "relative",
                  width: "200px",
                  paddingTop: "40%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={order.imageURL}
                  className="card-img-top"
                  alt={order.name}
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
                <h5 className="card-title">{order.name}</h5>
                <p className="card-text">{order.description}</p>
                <p className="text-primary">
                  Price: {productPrices[order.productId] || "Loading..."} ETH
                </p>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleRemoveOrder(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg mt-3"
          onClick={handleCheckout}
          disabled={orders.length === 0}
        >
          Checkout
        </button>
        <button
          className="btn btn-secondary btn-lg mt-3 ml-3"
          onClick={handleClearOrders}
          disabled={orders.length === 0}
        >
          Clear Orders
        </button>
      </div>
    </div>
  );
};

export default Order;
