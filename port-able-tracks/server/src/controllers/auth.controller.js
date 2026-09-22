const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const tokenFor = (user) => jwt.sign(
  { sub: user._id.toString(), username: user.username, role: user.role },
  process.env.JWT_SECRET || "change-this-development-secret",
  { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
);

const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  name: user.name,
  role: user.role
});

const register = async (req, res, next) => {
  try {
    const username = String(req.body.username || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const name = String(req.body.name || "").trim();

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    if (username.length < 3 || password.length < 8) {
      return res.status(400).json({ message: "Username needs 3 characters and password needs 8 characters" });
    }
    if (await User.exists({ username })) {
      return res.status(409).json({ message: "This username is already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, passwordHash, name });
    res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const username = String(req.body.username || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub).select("username name role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, me };
