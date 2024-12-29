// import React, { useEffect, useState } from "react";
// import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
// import { ethers } from "ethers";

// const EthereumConnector = ({ onConnected }) => {
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const connectToContract = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           await provider.send("eth_requestAccounts", []);
//           const signer = provider.getSigner();
//           const contractInstance = new ethers.Contract(
//             "0xaE7b7A1c6C4d859e19301ccAc2C6eD28A4C51288",
//             Marketplace.abi,
//             signer
//           );
//           setContract(contractInstance);
//           if (onConnected) {
//             onConnected(contractInstance);
//           }
//         } catch (error) {
//           console.error("Failed to connect to Ethereum:", error);
//         }
//       } else {
//         alert("MetaMask is not installed");
//       }
//     };

//     connectToContract();
//   }, [onConnected]);

//   return null; // Component không cần render giao diện
// };

// export default EthereumConnector;
