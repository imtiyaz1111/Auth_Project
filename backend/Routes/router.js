const express = require("express");
const router = express.Router();
require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userScehma");

// router.get("/",(req,res)=>{
//     res.send("Auth backend")
// })

router.post("/signin", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  try {
    if (!name || !email || !password || !cpassword) {
      return res.status(422).json({ error: "Please fill the all box" });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email is already present" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password is not match" });
    } else {
      const user = new User({ name, email, password, cpassword });
      //we are hashing here
      const userSingin = await user.save();
      if (userSingin) {
        res.status(202).json({ message: "user register successfully" });
      } else {
        res.status(500).json({ error: "Faild Register" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please filled the data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        return res.status(400).json({ error: "failed to login" });
      } else {
        return res.status(202).json({ message: "login successfully" });
      }
    } else {
      return res.status(400).json({ error: "failed to login" });
    }
  } catch (error) {
    console.log(error);
  }
});

//logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = router;
