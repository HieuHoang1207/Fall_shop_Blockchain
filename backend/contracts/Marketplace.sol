// contracts/Marketplace.sol
// contracts/Marketplace.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        uint256 productId;
        string name;
        string description;
        uint256 price;
        uint256 stock;
        string imageURL;
        string category;
        uint256 createdAt;
        uint256 updatedAt;
        address payable seller;
    }

    uint256 public productCount;
    mapping(uint256 => Product) public products;

    // Thêm sản phẩm mới
    function addProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _stock,
        string memory _imageURL,
        string memory _category
    ) public {
        productCount++;
        products[productCount] = Product(
            productCount,
            _name,
            _description,
            _price,
            _stock,
            _imageURL,
            _category,
            block.timestamp,
            block.timestamp,
            payable(msg.sender)
        );
    }

    // Sửa thông tin sản phẩm
    function updateProduct(
        uint256 _productId,
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _stock,
        string memory _imageURL,
        string memory _category
    ) public {
        Product storage product = products[_productId];
        //require(product.seller == msg.sender, "Only seller can update product");

        product.name = _name;
        product.description = _description;
        product.price = _price;
        product.stock = _stock;
        product.imageURL = _imageURL;
        product.category = _category;
        product.updatedAt = block.timestamp;
    }

    // Xóa sản phẩm
    function deleteProduct(uint256 _productId) public {
        //Product storage product = products[_productId];
        //require(product.seller == msg.sender, "Only seller can delete product");
        delete products[_productId];
    }

    // Mua sản phẩm
    function buyProduct(uint256 _productId) public payable {
        Product storage _product = products[_productId];
        
        // Kiểm tra xem số tiền gửi có đủ để mua sản phẩm không
        require(msg.value >= _product.price, "Not enough funds");

        // Kiểm tra xem sản phẩm còn hàng không
        require(_product.stock > 0, "Product out of stock");

        // Giảm số lượng sản phẩm trong kho
        _product.stock--;

        // Chuyển tiền cho người bán
        _product.seller.transfer(msg.value);

        // Cập nhật thời gian sửa đổi
        _product.updatedAt = block.timestamp;
    }

    // Cấu trúc User tương ứng với các cột trong bảng 'users'
    struct User {
        uint256 userId;          
        string username;         
        string email;            
        string walletAddress;    
    }

    mapping(uint256 => User) public users;
    uint256 public userCount;

    // Thêm người dùng mới
    function registerUser(string memory _username, string memory _email, string memory _walletAddress) public {
        userCount++;
        users[userCount] = User(userCount, _username, _email, _walletAddress);
    }

    // Kiểm tra xem ví đã đăng ký chưa
    function isUserRegistered(string memory _walletAddress) public view returns (bool) {
        for (uint256 i = 1; i <= userCount; i++) {
            if (keccak256(bytes(users[i].walletAddress)) == keccak256(bytes(_walletAddress))) {
                return true;
            }
        }
        return false;
    }

    struct Review {
        uint256 reviewId;
        uint256 userId;
        uint256 productId;
        uint256 rating;
        string comment;
        uint256 createdAt;
    }

    uint256 public reviewCount;
    mapping(uint256 => Review) public reviews;
    mapping(uint256 => uint256[]) public productReviews; // Lưu các reviewId của từng sản phẩm

    // Thêm review cho sản phẩm
    function addReview(
        uint256 _productId,
        uint256 _userId,
        uint256 _rating,
        string memory _comment
    ) public {
        require(_rating >= 1 && _rating <= 5, "Invalid rating value");

        reviewCount++;
        reviews[reviewCount] = Review(
            reviewCount,
            _userId,
            _productId,
            _rating,
            _comment,
            block.timestamp
        );
        productReviews[_productId].push(reviewCount);
    }

    // Lấy tất cả các review của sản phẩm
    function getReviews(uint256 _productId) public view returns (Review[] memory) {
        uint256[] memory reviewIds = productReviews[_productId];
        Review[] memory productReviewList = new Review[](reviewIds.length);

        for (uint256 i = 0; i < reviewIds.length; i++) {
            productReviewList[i] = reviews[reviewIds[i]];
        }

        return productReviewList;
    }
    
    function getUserId(address walletAddress) public view returns (uint256) {
    // Kiểm tra xem người dùng có tồn tại không, tránh lỗi khi truy cập
    require(users[walletAddress].userId != 0, "User not found");
    // Trả về userId của người dùng
    return users[walletAddress].userId;
    }
}
