require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const generateToken = userId => {
  const token = jwt.sign({userId}, process.env.JWT, {expiresIn: "1h"});
  return token;
};

const verifyToken = token => {
  try {
    const tokenValue = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(tokenValue, process.env.JWT);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = {generateToken, verifyToken, hashPassword};
