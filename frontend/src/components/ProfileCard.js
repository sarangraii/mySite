// ProfileCard.jsx - Component to display individual profile results
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="profile-card">
      <div className="profile-photo">
        {profile.profilePhoto ? (
          <img src={profile.profilePhoto} alt={`${profile.fullname}'s Photo`} />
        ) : (
          <div className="no-photo">No Photo</div>
        )}
      </div>
      <div className="profile-info">
        <h4>{profile.fullname}</h4>
        <p>
          {calculateAge(profile.dob)} years, {profile.gender}, {profile.religion}
          {profile.caste && `, ${profile.caste}`}
        </p>
        <p>{profile.education}</p>
        <p>{profile.location}</p>
        <p>{profile.phone}</p>
        <Link to={`/profile/${profile._id}`} className="view-profile-btn">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;