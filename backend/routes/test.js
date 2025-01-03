const bcrypt = require("bcrypt");
const password = "admin123"; // Đổi mật khẩu admin

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log(hash); // Copy hash và dán vào script SQL
});
