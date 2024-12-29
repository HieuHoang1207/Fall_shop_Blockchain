import React, { useState, useEffect } from "react";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { ethers } from "ethers";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");

  // Fetch products from contract
  const fetchProducts = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0xaE7b7A1c6C4d859e19301ccAc2C6eD28A4C51288", // Địa chỉ hợp đồng Marketplace
          Marketplace.abi,
          signer
        );

        const productCount = await contract.productCount();
        const productsArray = [];

        for (let i = 1; i <= productCount; i++) {
          const product = await contract.products(i);
          productsArray.push(product);
        }

        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xaE7b7A1c6C4d859e19301ccAc2C6eD28A4C51288", // Địa chỉ hợp đồng Marketplace
      Marketplace.abi,
      signer
    );

    try {
      const tx = await contract.addProduct(
        name,
        description,
        ethers.utils.parseEther(price),
        stock,
        imageURL,
        category
      );
      await tx.wait();
      alert("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageURL("");
      setCategory("");
      // Fetch lại danh sách sản phẩm sau khi thêm mới
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }
  };

  const handleUpdateProduct = async (productId) => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xaE7b7A1c6C4d859e19301ccAc2C6eD28A4C51288", // Địa chỉ hợp đồng Marketplace
      Marketplace.abi,
      signer
    );

    try {
      const tx = await contract.updateProduct(
        productId,
        name,
        description,
        ethers.utils.parseEther(price),
        stock,
        imageURL,
        category
      );
      await tx.wait();
      alert("Product updated successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageURL("");
      setCategory("");
      // Fetch lại danh sách sản phẩm sau khi cập nhật
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xaE7b7A1c6C4d859e19301ccAc2C6eD28A4C51288", // Địa chỉ hợp đồng Marketplace
      Marketplace.abi,
      signer
    );

    try {
      const tx = await contract.deleteProduct(productId);
      await tx.wait();
      alert("Product deleted successfully!");
      // Fetch lại danh sách sản phẩm sau khi xóa
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Products</h2>

      {/* Add Product Form */}
      <div className="card p-4 mb-5">
        <h4>Add Product</h4>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (ETH)"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock Quantity"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Image URL"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div>
        <h4>Product List</h4>
        {products.map((product) => (
          <div className="card p-3 mb-4" key={product.productId.toString()}>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-8">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>
                  <strong>Price:</strong>{" "}
                  {ethers.utils.formatEther(product.price)} ETH
                </p>
                <div>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleUpdateProduct(product.productId)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product.productId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
