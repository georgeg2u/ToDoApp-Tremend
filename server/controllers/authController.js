const UserModel = require("../models/userModel");
const {verifyToken, generateToken} = require("../utils/authUtils");
const bcrypt = require("bcrypt");

const authenticateToken = (req, res,next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({message: "Authorization token is missing."});
  }

  const userId = verifyToken(token);

  if (!userId) {
    return res.status(401).send({message: "Authorization token is invalid."});
  }

  req.body.userId = userId;
  next();
};

const authenticateUser = async (req, res) => {
  try {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if (!user) {
      return res
        .status(404)
        .send({message: "No user found. Please create an account."});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({message: "Username or password invalid."});
    }

    const token = generateToken(user._id);
    res.status(200).send({token});
  } catch (error) {
    console.log(error);
    res.status(500).send({message: "Internal server error"});
  }
};

module.exports = {authenticateToken, authenticateUser};
