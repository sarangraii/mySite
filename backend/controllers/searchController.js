// controllers/searchController.js - Handle search logic
const AddUser = require('../models/AddUser');

exports.searchProfiles = async (req, res) => {
  try {
    // Extract filter criteria from request body
    const {
      looking,
      gender,
      minAge,
      maxAge,
      religion,
      caste,
      education,
      familyType,
      familyStatus,
      location
    } = req.body;

    // Build query object
    const query = {};

    // Add criteria to query if they exist
    if (looking) query.looking = looking;
    if (gender) query.gender = gender;
    if (religion) query.religion = religion;
    if (caste) query.caste = caste;
    if (education) query.education = education;
    if (familyType) query.familyType = familyType;
    if (familyStatus) query.familyStatus = familyStatus;
    if (location) query.location = location;

    // Handle age range
    if (minAge || maxAge) {
      query.age = {};
      
      if (minAge) query.age.$gte = parseInt(minAge);
      if (maxAge) query.age.$lte = parseInt(maxAge);
    }

    // Execute query
    const profiles = await AddUser.find(query).select(
      'fullname gender dob religion caste education location profilePhoto'
    );

    return res.status(200).json(profiles);
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ message: 'Server error during search' });
  }
};
