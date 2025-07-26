const express = require("express");
const router = express.Router();
const AddUser = require("../models/AddUser"); // Make sure the path is correct

// Search filter API
router.post("/search", async (req, res) => {
  try {
    const { profilephoto, fullname, gender, age, religion, education, location,phone } = req.body;

    const filter = {};
    // Changed how profilephoto is handled in the filter
    if (profilephoto !== undefined && profilephoto !== null) filter.profilephoto = profilephoto;
    if (fullname) filter.fullname = { $regex: fullname, $options: "i" };
    if (gender) filter.gender = gender;
    if (age) filter.age = age;
    if (religion) filter.religion = religion;
    if (education) filter.education = education;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (phone) filter.phone = phone;

    const users = await AddUser.find(filter);
    
    // Make sure profile photos are included in the response
    res.json(users);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;