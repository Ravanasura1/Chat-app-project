import bcrypt from "bcryptjs"
import User from "../models/user.models.js";
import generateTokenAndSetToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // signup time pe check karo ki koi aur username to nahi same nam ka

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // password ko hashing karna taki safe rahe attacker se incase they get data

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // sign up time pe user se password confirm karna

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // profile set karna randomly gender ke base aur username ke base

    const profilePic = gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // sab karne ke bat set karna user ke details data model me

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });

    // response bhejna user ko uski jaise nam username aur profile pic

    if (newUser) {

      // token ke generate me id bhejna

      generateTokenAndSetToken(newUser._id, res)

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
      });
    } else {
      res.status(400).json({ error: "Invalid user data" })
    }

    // error me ye return kar dena

  } catch (error) {
    console.log("Error in sign up controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })

    // check karo ki jo password login me dala hai wo kisi existing user ka hai aur agar nahi to empty string banaya hai

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    // agar password ya user me se dono me ek bhi agar nahi hai to ye message response me bhej do

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" })
    }

    // login ke time token bana do

    generateTokenAndSetToken(user._id, res)

    // login ke time response me data bhej do user ka

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    })

  } catch (error) {

    console.log("Error in Login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });

  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({error: "Logged out successfully"})
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
