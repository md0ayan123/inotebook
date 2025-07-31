const express = require('express');
const userModel = require('../models/User');
const router = express.Router();
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="Harryisagoodb$oy"


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered. Please login."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: secPass
    });

    const payload = {
      user: {
        id: newUser.id
      }
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      authtoken,
      result: newUser
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);
    console.log(authtoken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      authtoken: authtoken,
      result: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports= router