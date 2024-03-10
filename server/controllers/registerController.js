const {validateUser} = require("../utils/validationUtils");
const UserModel = require("../models/userModel");
const {hashPassword} = require("../utils/authUtils");

const createAccount = async (req, res) => {
  try {
    const {error} = validateUser(req.body);
    if (error) {
      return res.status(400).send({message: error.details[0].message});
    }

    let user = await UserModel.findOne({username: req.body.username});
    if (user) {
      return res
        .status(409)
        .send({message: "User with given username already exists."});
    }

    const hashedPassword = await hashPassword(req.body.password);

    user = await new UserModel({
      ...req.body,
      password: hashedPassword,
    }).save();
    console.log("User created.");

    res.status(201).send({message: "User created succesfully."});
  } catch (error) {
    console.log(error);
    res.status(500).send({message: "Internal server error."});
  }
};

module.exports = {createAccount};
