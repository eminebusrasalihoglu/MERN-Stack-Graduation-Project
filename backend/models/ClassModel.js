import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    students: { type: [String], required: true },
    academic: { type: String, required: true },
    classCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model('Class', classSchema);
export default Class;
