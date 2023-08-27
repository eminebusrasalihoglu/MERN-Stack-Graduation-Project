import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  file: {
    type: String,
    required: [true, 'Please provide a file'],
  },
  studentMail: {
    type: String,
    required: [true, 'Unauthorized'],
  },
  classCode: { type: String, required: true },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
