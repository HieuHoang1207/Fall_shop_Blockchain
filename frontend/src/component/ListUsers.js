//frontend\src\component\ListUsers.js
const registerUserInDatabase = async (user) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to save user to database");
    }

    console.log("User saved to database successfully");
  } catch (error) {
    console.error("Error saving user to database:", error);
  }
};

// Sau khi lấy thông tin từng người dùng
const usersArray = [];
for (let i = 1; i <= userCount; i++) {
  const user = await contract.users(i);
  const userInfo = {
    userId: user.userId.toString(),
    username: user.username,
    email: user.email,
    walletAddress: user.walletAddress,
  };
  usersArray.push(userInfo);

  // Lưu vào database
  await registerUserInDatabase(userInfo);
}
