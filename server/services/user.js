const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    if (username.length < 5) {
      return res.status(400).json({ error: "Usename must be of length 5!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be of length 6!" });
    }
    const checkUser = await User.findOne({ $or: [{ email }, { password }] });
    if (checkUser) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists!" });
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashPass });
      await newUser.save();
      return res.status(200).json({ success: "Registration Successfully" });
    }
  } catch (e) {
    console.log(`Error in User Register: ${e}`);
    return res.status(404).json({ error: "Internal server error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("email and password is required");
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, (err, data) => {
        if (data) {
          const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );
          res.cookie("TaskmanagerUserToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
          });
          return res.status(200).json({ success: "Login Success!" });
        } else {
          return res.status(400).json({ error: "Invalid Credentials" });
        }
      });
    }
  } catch (error) {
    console.log("error at Login: ", error);
    return res.status(404).json({ error: "Internal server error!" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("TaskmanagerUserToken", { httpOnly: true });
    res.json({ message: "Logged Out" });
  } catch (error) {
    return res.status(4004).json({ error: "Internal server error" });
  }
};

const userDetails = async (req, res) => {
  try {
    const { user } = req;
    const getDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");
    if (getDetails) {
      const allTasks = getDetails.tasks;
      let yetToStart = [];
      let inProgress = [];
      let completed = [];
      allTasks.map((item) => {
        if (item.status === "yetToStart") {
          yetToStart.push(item);
        } else if (item.status === "inProgress") {
          inProgress.push(item);
        } else {
          completed.push(item);
        }
      });
      return res.status(200).json({
        success: "success",
        tasks: [{ yetToStart }, { inProgress }, { completed }],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, logout, userDetails };
