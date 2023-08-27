import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    firmName: { type: String, required: true },
    firmOfficial: { type: String, required: true },
    firmOfficialJob: { type: String, required: true },
    firmPhoneNumber: { type: Number, required: true },
    firmEmail: { type: String, required: true },
    studentName: { type: String, required: true },
    survey1: { type: String, required: true },
    survey2: { type: String, required: true },
    survey3: { type: String, required: true },
    survey4: { type: String, required: true },
    survey5: { type: String, required: true },
    survey6: { type: String, required: true },
    survey7: { type: String, required: true },
    survey8: { type: String, required: true },
    survey9: { type: String, required: true },
    survey10: { type: String, required: true },
    description: { type: String, required: true },
    evaluation: { type: String, required: true },
    classCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model('Company', companySchema);
export default Company;
