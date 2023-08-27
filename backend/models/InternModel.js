import mongoose from 'mongoose';

const internSchema = new mongoose.Schema(
  {
    firmName: { type: String, required: true },
    firmOfficial: { type: String, required: true },
    firmOfficialJob: { type: String, required: true },
    firmPhoneNumber: { type: String, required: true },
    firmEmail: { type: String, required: true },
    firmFax: { type: String, required: true },
    firmWebSite: { type: String, required: true },
    firmDescription: { type: String, required: true },
    internshipType: { type: String, required: true },
    internshipStartDate: { type: String, required: true },
    internshipFinishDate: { type: String, required: true },
    totalDay: { type: String },
    insuranceType: { type: String, required: true },
    insuranceNo: { type: String, required: true, unique: true },
    studentMail: { type: String, required: true, unique: true },
    studentName: { type: String, required: true, unique: true },
    status: { type: Boolean, required: true, default: false },
    classCode:{ type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Intern = mongoose.model('Intern', internSchema);
export default Intern;
