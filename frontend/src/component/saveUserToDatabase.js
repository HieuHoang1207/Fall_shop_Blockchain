const saveUserToDatabase = async (user) => {
  try {
    const response = await fetch("http://localhost:3001/api/users", {
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

module.exports = saveUserToDatabase;
