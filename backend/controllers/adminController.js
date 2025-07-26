const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, admin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Fetch Admin Profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const { fullname, email, phone_no } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { fullname, email, phone_no },
      { new: true }
    );
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// ✅ Fetch All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ✅ Update User Status
exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { status }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user status" });
  }
};
