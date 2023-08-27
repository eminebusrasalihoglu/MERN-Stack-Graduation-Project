import express from 'express';
import { authRole } from '../auth/authRoles.js';
import Company from '../models/CompanyModel.js';
import Intern from '../models/InternModel.js'
const companyRouter = express.Router();

companyRouter.post('/form', authRole('FIRM'), async (req, res) => {
  try {
    const {
      firmName,
      firmOfficial,
      firmOfficialJob,
      firmPhoneNumber,
      firmEmail,
      studentName,
      survey1,
      survey2,
      survey3,
      survey4,
      survey5,
      survey6,
      survey7,
      survey8,
      survey9,
      survey10,
      description,
      evaluation,
    } = req.body;
    const classCode = req.tokenPayload.classCode;
    const createdCompany = await Company.create({
      firmName,
      firmOfficial,
      firmOfficialJob,
      firmPhoneNumber,
      firmEmail,
      studentName,
      survey1,
      survey2,
      survey3,
      survey4,
      survey5,
      survey6,
      survey7,
      survey8,
      survey9,
      survey10,
      description,
      evaluation,
      classCode,
    });

    return res.status(201).json(createdCompany);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});



companyRouter.get('/survey', authRole('ACADEMIC'), async (req, res) => {
  const classCode = req.tokenPayload.classCode;
  const firms = await Company.find({classCode:classCode});
  res.send(firms);
});

companyRouter.get('/students', authRole('FIRM'), async (req, res) => {
  const firmMail = req.tokenPayload.email;
  const students = await Intern.find({ "firmEmail": firmMail },{studentName:1});
  res.send(students);
});

export default companyRouter;
