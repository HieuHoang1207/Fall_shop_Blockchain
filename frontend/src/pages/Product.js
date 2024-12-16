import React, { useEffect, useState } from "react";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";

// Hàm fetch thông tin sản phẩm
const fetchProduct = async (productId) => {
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
      const productData = await contract.products(productId);
      return productData;
    } catch (error) {
      console.error(
        "There was an error fetching the product from the contract!",
        error
      );
      return null;
    }
  } else {
    alert("MetaMask is not installed");
    return null;
  }
};

// Hàm fetch bình luận sản phẩm
const fetchReviews = async (productId) => {
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Địa chỉ hợp đồng Marketplace
        Marketplace.abi,
        signer
      );

      // Gọi hàm getReviews từ smart contract
      const reviewsData = await contract.getReviews(productId);
      return reviewsData.map((review) => ({
        reviewId: review.reviewId.toNumber(),
        userId: review.userId.toNumber(),
        rating: review.rating.toNumber(),
        comment: review.comment,
        createdAt: new Date(
          review.createdAt.toNumber() * 1000
        ).toLocaleDateString(),
      }));
    } catch (error) {
      console.error("There was an error fetching the reviews!", error);
      return [];
    }
  } else {
    alert("MetaMask is not installed");
    return [];
  }
};

const Product = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState(""); // State cho comment
  const [newRating, setNewRating] = useState(5); // State cho rating

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const fetchedProduct = await fetchProduct(id);
      setProduct(fetchedProduct);

      const fetchedReviews = await fetchReviews(id);
      setReviews(fetchedReviews);

      setLoading(false);
    };

    fetchData();
  }, [id]); // Re-fetch khi id thay đổi

  if (loading) return <div className="text-center">Loading...</div>;
  if (!product) return <div className="text-center">Product not found!</div>;

  // Chuyển đổi BigNumber thành các giá trị có thể render được
  const formattedPrice = ethers.utils.formatEther(product.price); // Chuyển price từ BigNumber sang Ether
  const formattedCreatedAt = new Date(
    product.createdAt * 1000
  ).toLocaleDateString(); // Chuyển createdAt từ BigNumber sang ngày
  const formattedUpdatedAt = new Date(
    product.updatedAt * 1000
  ).toLocaleDateString(); // Chuyển updatedAt từ BigNumber sang ngày

  const handleBuy = async (price) => {
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

        // Thực hiện mua sản phẩm với productId là id từ URL
        const tx = await contract.buyProduct(id, {
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

  const fetchUserId = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Địa chỉ hợp đồng Marketplace
          Marketplace.abi,
          signer
        );

        const userAddress = await signer.getAddress(); // Lấy địa chỉ ví
        const userId = await contract.getUserId(userAddress); // Gọi hàm getUserId
        return userId.toNumber();
      } catch (error) {
        console.error("Error fetching userId:", error);
        return null;
      }
    } else {
      alert("MetaMask is not installed");
      return null;
    }
  };

  // Hàm thêm bình luận
  const handleAddReview = async () => {
    if (!newComment || newRating < 1 || newRating > 5) {
      alert("Please enter a valid comment and rating between 1 and 5.");
      return;
    }

    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          Marketplace.abi,
          signer
        );

        // Gọi hàm getUserId từ contract để lấy userId
        const userAddress = await signer.getAddress();
        const userId = await contract.getUserId(userAddress);

        // Gọi hàm addReview từ smart contract
        const tx = await contract.addReview(id, userId, newRating, newComment);
        await tx.wait();

        alert("Review added successfully!");
        setNewComment(""); // Reset comment
        setNewRating(5); // Reset rating

        // Fetch lại reviews sau khi thêm
        const updatedReviews = await fetchReviews(id);
        setReviews(updatedReviews);
      } catch (error) {
        console.error("Error adding review:", error);
        alert(`Error: ${error.message}`);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  return (
    <div className="container mt-5">
      {/* Hiển thị thông tin sản phẩm */}
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageURL}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-primary">{product.name}</h1>
          <p className="lead">{product.description}</p>
          <div className="mb-3">
            <strong>Category: </strong>
            <span>{product.category}</span>
          </div>
          <div className="mb-3">
            <strong>Price: </strong>
            <span>{formattedPrice} ETH</span>
          </div>
          <div className="mb-3">
            <strong>Stock: </strong>
            <span>{product.stock.toString()}</span>
          </div>
          <div className="mb-3">
            <strong>Seller: </strong>
            <span>{product.seller}</span>
          </div>
          <div className="mb-3">
            <strong>Created At: </strong>
            <span>{formattedCreatedAt}</span>
          </div>
          <div className="mb-3">
            <strong>Updated At: </strong>
            <span>{formattedUpdatedAt}</span>
          </div>
        </div>
      </div>

      {/* Nút Buy */}
      <div className="text-center mt-4">
        <button
          className="btn btn-success btn-lg"
          onClick={(e) => {
            e.stopPropagation(); // Ngừng sự kiện click lan truyền
            handleBuy(formattedPrice); // Truyền giá trị price vào handleBuy
          }}
        >
          Buy
        </button>
      </div>

      {/* Hiển thị bình luận */}
      <div className="mt-5">
        <h3 className="text-primary">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.reviewId} className="mb-3">
              <p>
                <strong>User {review.userId}</strong> ({review.createdAt}):{" "}
                <span>{review.comment}</span>
              </p>
              <p>Rating: {review.rating} / 5</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      {/* Thêm bình luận */}
      <div className="mt-5">
        <h3 className="text-primary">Add Review</h3>
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            className="form-control"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            className="form-control"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Product;
