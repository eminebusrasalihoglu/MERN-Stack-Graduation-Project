import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minLength: [8, 'It must be a minimum of 8 characters.'],
    },
    userType: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    schoolNo: { type: String },
    identifyNo: { type: String, required: true },
    facultyType: { type: String, required: true },
    classCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
