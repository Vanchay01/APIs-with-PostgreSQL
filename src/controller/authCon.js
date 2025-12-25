const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../model/authModel");

const signup = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body
  const result = await authModel.signup({username: username, email: email, password: password});
  console.log(result);
  if (!result) {
    return res.json({
      message: `Resgiter Failed..!!`,
      status: 400,
    });
  }
  return res.json({
    message: `User: ${result.email}, Resgiter Successfully!!!`,
    status: 201,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authModel.login({ email: email });
  console.log(user);
  if (!user) {
    return res.json({ message: "User not found.." });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.json({ message: "Email And Password Incorrent.." });
  }
  const tokens = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res.json({
    message: "LogIn Successfully.....",
    status: 200,
    token: tokens,
  });
});

module.exports = {
  signup,
  login,
};
