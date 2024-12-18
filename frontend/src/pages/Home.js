//frontend\src\pages\Home.js
import React, { useEffect, useState } from "react";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    const fetchProducts = async () => {
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

          // Lấy tổng số sản phẩm
          const productCount = await contract.productCount();
          const productsArray = [];

          // Lấy thông tin từng sản phẩm
          for (let i = 1; i <= productCount; i++) {
            const product = await contract.products(i);
            productsArray.push(product);
          }

          setProducts(productsArray);
          setLoading(false);
        } catch (error) {
          console.error(
            "There was an error fetching the products from the contract!",
            error
          );
          setLoading(false);
        }
      } else {
        alert("MetaMask is not installed");
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = async (productId, price) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Yêu cầu người dùng kết nối MetaMask nếu chưa kết nối

        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Địa chỉ hợp đồng Marketplace
          Marketplace.abi,
          signer
        );

        const tx = await contract.buyProduct(productId, {
          value: ethers.utils.parseEther(price.toString()), // Đảm bảo giá trị hợp lệ (ETH)
        });

        await tx.wait(); // Chờ giao dịch được xác nhận

        alert("Product purchased successfully!");
      } catch (error) {
        console.error("Error in transaction:", error);
        alert(`Error: ${error.message}`);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Điều hướng đến trang chi tiết của sản phẩm
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <h2 className="text-center mb-4">Welcome to FallShop</h2>
      <div className="row">
        {products.map((product) => (
          <div
            className="col-12 col-md-4 mb-4"
            key={product.productId.toString()}
          >
            <div
              className="card"
              onClick={() => handleProductClick(product.productId)}
            >
              <div className="card-img-wrapper">
                <img
                  src={product.imageURL}
                  className="card-img-top"
                  alt={product.name}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Price: </strong>
                  {ethers.utils.formatEther(product.price)} ETH
                </p>
                <p className="card-text">
                  <strong>Stock: </strong>
                  {product.stock.toString()}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation(); // Ngừng sự kiện click lan truyền
                    handleBuy(
                      product.productId,
                      ethers.utils.formatEther(product.price)
                    );
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
