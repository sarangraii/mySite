// controllers/filterController.js - Handle getting filter options
const AddUser = require('../models/AddUser');

exports.getReligions = async (req, res) => {
  try {
    const religions = await AddUser.distinct('religion');
    return res.status(200).json(religions);
  } catch (error) {
    console.error('Error fetching religions:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getCastesByReligion = async (req, res) => {
  try {
    const { religion } = req.params;
    const castes = await AddUser.distinct('caste', { religion });
    return res.status(200).json(castes);
  } catch (error) {
    console.error('Error fetching castes:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getEducations = async (req, res) => {
  try {
    const educations = await AddUser.distinct('education');
    return res.status(200).json(educations);
  } catch (error) {
    console.error('Error fetching educations:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await AddUser.distinct('location');
    return res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};