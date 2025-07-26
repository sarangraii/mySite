const mongoose = require('mongoose');

const heightRangeSchema = new mongoose.Schema({
  heightFrom: {
      type: Number,
      required: true,
      min: 3.0,
      max: 7.0
  },
  heightTo: {
      type: Number,
      required: true,
      min: 3.0,
      max: 7.0,
      validate: {
          validator: function (value) {
              return value >= this.heightFrom;
          },
          message: 'heightTo must be greater than or equal to heightFrom'
      }
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  looking: {
    type: String,
    required: [true, 'please select your type'],
    enum: ['bride', 'groom', 'divorce bride','divorce groom']
  },
  fullname: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  phone_no: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  religion: {
    type: String,
    required: [true, 'Religion is required']
  },
  caste: String,
  age: Number,
  education:{
    type:String,
    required: [true, 'education is required'],
    enum: ["High School", "Bachelor's", "Master's","Doctorate","Other"]
  },
  height:{
   type:Number,
  },
  heightRange: heightRangeSchema,
  horoscope_details: String,
  
  // Family details
  fatherName: String,
  fatherOccupation: String,
  motherName: String,
  motherOccupation: String,
  brothers: {
    type: Number,
    default: 0
  },
  sisters: {
    type: Number,
    default: 0
  },
  familyStatus: String,
  familyType: String,
  familyValues: String,
  location: String,
  profilePhotoPath: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  if (this.dob) {
    const today = new Date();
    const birthDate = new Date(this.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    this.age = age;
  }
  next();
});

// ✅ Check if model exists before defining it
const AddUser = mongoose.models.AddUser || mongoose.model('AddUser', userSchema);

module.exports = AddUser;
