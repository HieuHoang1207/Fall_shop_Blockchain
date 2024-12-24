import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json"; // Import ABI của hợp đồng
import "../css/News.css"; // Import CSS để làm đẹp giao diện

const News = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Địa chỉ hợp đồng Marketplace
          Marketplace.abi,
          signer
        );

        const newsCount = await contract.getNewsCount();
        const newsArray = [];

        for (let i = 1; i <= newsCount; i++) {
          const newsItem = await contract.getNews(i);
          newsArray.push(newsItem);
        }

        setNews(newsArray);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <h2 className="page-title">News Page</h2>
      <div className="news-container">
        {news.length > 0 ? (
          news.map((newsItem, index) => (
            <div key={index} className="news-item">
              <h3 className="news-title">{newsItem.title}</h3>
              <img
                className="news-image"
                src={newsItem.image}
                alt={newsItem.title}
              />
              <p className="news-date">
                Created at:{" "}
                {new Date(newsItem.createAt * 1000).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="no-news">No news available</p>
        )}
      </div>
    </div>
  );
};

export default News;
