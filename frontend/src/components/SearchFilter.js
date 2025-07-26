import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SearchFilter.css'
import { Link } from 'react-router-dom';
const SearchFilter = () => {
  // State for form inputs
  const [filters, setFilters] = useState({
    looking: '',
    gender: '',
    ageRange: { min: 18, max: 70 },
    religion: '',
    caste: '',
    education: '',
    familyStatus: '',
    familyType: '',
    familyValues: '',
    location: ''
  });

  // State for search results
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Handle age range changes
  const handleAgeRangeChange = (key, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ageRange: {
        ...prevFilters.ageRange,
        [key]: parseInt(value)
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/search', filters);
      setResults(response.data);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      looking: '',
      gender: '',
      ageRange: { min: 18, max: 70 },
      religion: '',
      caste: '',
      education: '',
      familyStatus: '',
      familyType: '',
      familyValues: '',
      location: ''
    });
  };

  return (
    <div className="search-filter-container">
      <h2 className="text-2xl font-bold mb-4">Find Your Perfect Match</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Looking For */}
          <div className="form-group">
            <label htmlFor="looking" className="block text-sm font-medium mb-1">Looking for</label>
            <select
              id="looking"
              name="looking"
              value={filters.looking}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select option</option>
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
              <option value="divorce bride">Divorce Bride</option>
              <option value="divorce groom">Divorce Groom</option>
            </select>
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender" className="block text-sm font-medium mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              value={filters.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age Range */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Age Range</label>
            <div className="flex items-center">
              <input
                type="number"
                min="18"
                max="100"
                value={filters.ageRange.min}
                onChange={(e) => handleAgeRangeChange('min', e.target.value)}
                className="w-20 p-2 border rounded"
              />
              <span className="mx-2">to</span>
              <input
                type="number"
                min="18"
                max="100"
                value={filters.ageRange.max}
                onChange={(e) => handleAgeRangeChange('max', e.target.value)}
                className="w-20 p-2 border rounded"
              />
            </div>
          </div>

          {/* Religion */}
          <div className="form-group">
            <label htmlFor="religion" className="block text-sm font-medium mb-1">Religion</label>
            <select
              id="religion"
              name="religion"
              value={filters.religion}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
              <option value="Buddhist">Buddhist</option>
              <option value="Jain">Jain</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Caste */}
          <div className="form-group">
            <label htmlFor="caste" className="block text-sm font-medium mb-1">Caste</label>
            <input
              type="text"
              id="caste"
              name="caste"
              value={filters.caste}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter caste"
            />
          </div>

          {/* Education */}
          <div className="form-group">
            <label htmlFor="education" className="block text-sm font-medium mb-1">Education</label>
            <select
              id="education"
              name="education"
              value={filters.education}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select education</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Doctorate">Doctorate</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Family Status */}
          <div className="form-group">
            <label htmlFor="familyStatus" className="block text-sm font-medium mb-1">Family Status</label>
            <select
              id="familyStatus"
              name="familyStatus"
              value={filters.familyStatus}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select family status</option>
              <option value="Middle Class">Middle Class</option>
              <option value="Upper Middle Class">Upper Middle Class</option>
              <option value="Rich">Rich</option>
              <option value="Affluent">Affluent</option>
            </select>
          </div>

          {/* Family Type */}
          <div className="form-group">
            <label htmlFor="familyType" className="block text-sm font-medium mb-1">Family Type</label>
            <select
              id="familyType"
              name="familyType"
              value={filters.familyType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select family type</option>
              <option value="Joint Family">Joint Family</option>
              <option value="Nuclear Family">Nuclear Family</option>
            </select>
          </div>

          {/* Family Values */}
          <div className="form-group">
            <label htmlFor="familyValues" className="block text-sm font-medium mb-1">Family Values</label>
            <select
              id="familyValues"
              name="familyValues"
              value={filters.familyValues}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select family values</option>
              <option value="Traditional">Traditional</option>
              <option value="Moderate">Moderate</option>
              <option value="Liberal">Liberal</option>
            </select>
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter location"
            />
          </div>
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex gap-4 mt-6">
          <button 
            type="submit" 
            className="bg-red-500 text-black px-6 py-2 rounded hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button 
            type="button" 
            onClick={resetFilters} 
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* Results Section */}
      {results.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Search Results ({results.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(profile => (
              <div key={profile._id} className="border rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 relative">
                  {profile.profilePhoto ? (
                    <img 
                      src={profile.profilePhoto} 
                      alt={profile.fullname} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Photo
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg">{profile.fullname}</h4>
                  <div className="text-sm text-gray-600 mt-2">
                    <p>{profile.age} years • {profile.religion} {profile.caste && `• ${profile.caste}`}</p>
                    <p>{profile.education} • {profile.location} </p>
                    <p>{profile.phone}</p>
                  </div>
                  <Link to={`/profile/${profile._id}`} className="view-profile-btn">
                  View Profile
                 </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !loading && (
        <div className="mt-8 text-center text-gray-500">
          {results.length === 0 && filters.looking ? 'No matches found. Try adjusting your filters.' : 'Use the search filters to find your perfect match.'}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;