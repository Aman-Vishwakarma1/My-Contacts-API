const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//--------------------------------------REGISTER NEW USER CONTROLLER----------------------------------------//
//@description : register a user
//@route : POST /api/user/signup
//@access : public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  //check that any field is empty or not.
  if (!name || !email || !phone || !password) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  //finds existing user or not.
  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("user is already registered");
  }
  //hashing received password.
  const hashedPassword = await bcrypt.hash(password, 10);
  //Adding the details in DB.
  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  //Checking that user dats is created in DB or not.
  if (!newUser) {
    res.status(400);
    throw new Error("user not created, try once again");
  } else {
    res.status(201).json({
      message: "User created successfully",
      _id: newUser.id,
      email: newUser.email,
    });
  }
});

//------------------------------------LOGING CONTROLLER----------------------------------------//
//@description : login a user
//@route : POST /api/user/login
//@access : public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  //Checking that field are not empty.
  if (!email || !password) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found, Please register first");
  }
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );

    console.log("access token: ", accessToken);

    res
      .status(200)
      .json({ message: "user login successfull", Token: accessToken });
  } else {
    res.status(401);
    throw new Error("oops!, Email or Password does not match");
  }
});

//---------------------------------------CURRENT USER CONTROLLER------------------------------------------//
//@description : register a user
//@route : POST /api/user/login-user
//@access : private
exports.currentUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});
