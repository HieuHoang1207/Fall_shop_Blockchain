require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [`${process.env.PRIVATE_KEY_MANAGEMENT}`], // Private Key của tài khoản
    },
  },
  // accounts: [
  //   {
  //     privateKey:
  //       "0x59c6995e998f97a5a004497a30ac81d732599aa290e3277a6e1f61a57bd6232f",
  //     balance: "10000000000000000000000",
  //   },
  //   {
  //     privateKey:
  //       "0x8b3a350cf5c34c9194ca3da98e5b3cef9f15c9c4a7e67e7ff9c3f5f34a9a79b0",
  //     balance: "10000000000000000000000",
  //   },
  // ],
  // chainId: 31337,
  // },
  // localhost: {
  //   url: "http://127.0.0.1:8545", // Đổi cổng sang 8546
  //   chainId: 31337,
  // },
  // },
};
