//utils\useMarketplace.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

const useMarketplace = () => {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();

          // Khai báo contractInstance đúng trước khi gán
          const contractInstance = new ethers.Contract(
            "0xaE7b7A1c6C4d859e19301ccAc2C6eD28A4C51288",
            Marketplace.abi,
            signer
          );

          setSigner(signer);
          setContract(contractInstance); // Không còn lỗi no-undef
        } catch (error) {
          console.error("Failed to connect with contract", error);
        }
      } else {
        alert("MetaMask is not installed");
      }
    };

    loadContract();
  });

  return { contract, signer };
};

export default useMarketplace;
