const express = require("express");
const { loginAdmin, getAdminProfile, updateAdminProfile, getAllUsers, updateUserStatus } = require("../controllers/adminController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/profile", authenticate, getAdminProfile);
router.put("/profile", authenticate, updateAdminProfile);
router.get("/users", authenticate, getAllUsers);
router.put("/users/:userId/status", authenticate, updateUserStatus);

module.exports = router;
