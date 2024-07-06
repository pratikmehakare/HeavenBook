const User = require("../../models/user");
const isValidEmail = require("../../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(401).json({
        error: true,
        message: "Invalid Email",
      });
    }

    if (!password) {
      return res.status(401).json({
        error: true,
        message: "Enter Password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(402).json({
        error: true,
        message: "User does not exists",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: true,
        message: "Password id incorrect",
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      error: false,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Failed to login",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All details are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({
            success:false,
            message:"Email is Already Registered."
        })
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });

    res.status(200).json({
      success: true,
      message: "Sign Up Successful..",
      user: {
        name: newUser.name,
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.log("Sign up error", err);
    return res.status(500).json({
      succuss: false,
      message: "Failed to signup",
      error: err.message,
    });
  }
};
