const express = require('express');
const router = express.Router();
const AddUser = require('../models/AddUser');
const auth = require('../middleware/auth'); // Assuming you have auth middleware

// @route   POST api/profiles/search
// @desc    Search users with filters
// @access  Private (you may want this route protected)
router.post('/search', auth, async (req, res) => {
  try {
    const {
      looking,
      gender,
      ageRange,
      religion,
      caste,
      education,
      heightRange,
      familyStatus,
      familyType,
      familyValues,
      location,
      page = 1
    } = req.body;

    // Build search query
    const query = {};
    const perPage = 12; // Number of results per page

    // Apply filters only if they are provided
    if (looking) query.looking = looking;
    if (gender) query.gender = gender;
    if (religion) query.religion = religion;
    if (education) query.education = education;
    if (familyStatus) query.familyStatus = familyStatus;
    if (familyType) query.familyType = familyType;
    if (familyValues) query.familyValues = familyValues;

    // Age range filter
    if (ageRange && ageRange.length === 2) {
      query.age = { $gte: ageRange[0], $lte: ageRange[1] };
    }

    // Height range filter (convert from feet to stored format)
    if (heightRange && heightRange.heightFrom && heightRange.heightTo) {
      query.height = { 
        $gte: parseFloat(heightRange.heightFrom), 
        $lte: parseFloat(heightRange.heightTo) 
      };
    }

    // Caste filter (case insensitive)
    if (caste) {
      query.caste = { $regex: caste, $options: 'i' };
    }

    // Location filter (case insensitive partial match)
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Don't show the user's own profile in search results
    query._id = { $ne: req.user.id };

    // Execute query with pagination
    const totalUsers = await AddUser.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / perPage);

    const users = await AddUser.find(query)
      .select('looking fullname age gender religion caste education height location profilePhotoPath')
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      users,
      totalUsers,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;