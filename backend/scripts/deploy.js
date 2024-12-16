//scripts\deploy.js
const { ethers } = require("hardhat");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the Marketplace contract
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.deployed();
  console.log("Marketplace contract deployed to:", marketplace.address);

  // Connect to MySQL database
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  console.log("Connected to MySQL");

  // Fetch products from MySQL
  const [rows] = await connection.execute("SELECT * FROM products");
  console.log(`Fetched ${rows.length} products from database`);

  // Add products to the Marketplace contract
  for (const product of rows) {
    const tx = await marketplace.addProduct(
      product.productId,
      product.name,
      ethers.utils.parseUnits(product.price.toString(), "ether"),
      product.stock,
      product.imageURL,
      product.category
    );
    await tx.wait();
    console.log(`Added product: ${product.name} (ID: ${product.productId})`);
  }

  // Fetch users from MySQL
  const [users] = await connection.execute("SELECT * FROM users");
  console.log(`Fetched ${users.length} users from database`);

  // Register users in the Marketplace contract
  for (const user of users) {
    const tx = await marketplace.registerUser(
      user.username,
      user.email,
      user.walletAddress
    );
    await tx.wait();
    console.log(`Registered user: ${user.username} (ID: ${user.userId})`);
  }

  const [reviews] = await connection.execute("SELECT * FROM reviews");
  console.log(`Fetched ${reviews.length} reviews from database`);

  // Add reviews to the Marketplace contract
  for (const review of reviews) {
    const tx = await marketplace.addReview(
      review.productId,
      review.userId,
      review.rating,
      review.comment
    );
    await tx.wait();
    console.log(
      `Added review: ID ${review.reviewId} for Product ID ${review.productId}`
    );
  }

  // Close the MySQL connection
  await connection.end();
  console.log("Closed MySQL connection");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
