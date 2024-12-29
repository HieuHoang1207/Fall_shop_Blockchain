//scripts\deploy.js
const { ethers } = require("hardhat");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function main() {
  await hre.run("compile"); // Compile contracts trước khi deploy

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

  // Fetch news from MySQL
  const [news] = await connection.execute("SELECT * FROM news");
  console.log(`Fetched ${news.length} news from database`);

  // Add news to the Marketplace contract
  for (const article of news) {
    // Chuyển đổi createAt và updateAt thành timestamp (số giây từ epoch)
    const createAtTimestamp = new Date(article.create_at).getTime() / 1000; // Chuyển thành giây
    const updateAtTimestamp = new Date(article.update_at).getTime() / 1000; // Chuyển thành giây

    const tx = await marketplace.addNews(
      article.id,
      article.title,
      article.content,
      article.image,
      createAtTimestamp,
      updateAtTimestamp
    );
    await tx.wait();
    console.log(
      `Added news: ${article.title} (ID: ${article.id}),${article.image}`
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
