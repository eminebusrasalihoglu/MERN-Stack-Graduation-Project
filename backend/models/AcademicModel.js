import mongoose from 'mongoose';

const academicSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  students: { type: [String], required: true }
  ,
  startDate: {
    type: Date,
    required: [true, 'Please provide a startDate'],
    trim: true,
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide a endDate'],
    trim: true,
  },
  fileType: {
    type: String,
    required: [true, 'Please provide a endDate'],
    trim: true,
  },
  file: {
    type: String,
  },
  academicMail: {
    type: String,
    required: [true, 'Unauthorized'],
  },
  classCode:{ type : String, required:true},
});

const Academic = mongoose.model('Academic', academicSchema );
export default Academic;