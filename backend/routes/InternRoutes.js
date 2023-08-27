import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Intern from '../models/InternModel.js';
import { authRole } from '../auth/authRoles.js';

const internRouter = express.Router();

internRouter.post('/register', authRole('STUDENT'), async (req, res) => {
  try {
    const {
      firmName,
      firmOfficial,
      firmOfficialJob,
      firmPhoneNumber,
      firmEmail,
      firmFax,
      firmWebSite,
      firmDescription,
      internshipType,
      internshipStartDate,
      internshipFinishDate,
      totalDay,
      insuranceType,
      insuranceNo,
    } = req.body;
    const classCode = req.tokenPayload.classCode;
    const studentMail = req.tokenPayload.email;
    const studentName = req.tokenPayload.fullname;
    const internExists = await Intern.findOne({ studentMail });
    if (internExists)
      return res.status(400).json({
        message: 'The user already has an internship record for this information.',
      });
    if (internshipStartDate >= internshipFinishDate) {
      return res
        .status(400)
        .json({ message: 'The end date cannot be earlier than the start date.' });
    }
    const createdIntern = await Intern.create({
      firmName,
      firmOfficial,
      firmOfficialJob,
      firmPhoneNumber,
      firmEmail,
      firmFax,
      firmWebSite,
      firmDescription,
      internshipType,
      internshipStartDate,
      internshipFinishDate,
      totalDay,
      insuranceType,
      insuranceNo,
      studentMail,
      studentName,
      classCode,
    });

    return res.status(201).json(createdIntern);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
internRouter.get('/companies', authRole('ACADEMIC'), async (req, res) => {
  const classCode = req.tokenPayload.classCode;
  const companies = await Intern.find({"status":"true",classCode:classCode});
  res.send(companies);
});

internRouter.get('/info', authRole('STUDENT'), async (req, res) => {
  const interninfo = await Intern.findOne({
    studentMail: req.tokenPayload.email,
  });
  res.send(interninfo);
});
internRouter.get('/list', authRole('ACADEMIC'), async (req, res) => {
  const classCode = req.tokenPayload.classCode;
  const interninfo = await Intern.find({classCode:classCode});
  res.send(interninfo);
});
internRouter.post('/confirm', authRole('ACADEMIC'), async (req, res) => {
  const _id = Object.keys(req.body)[0];
  
  const item = await Intern.updateOne({ _id: _id }, { $set: { status: true} });
  if (!item) {
    return next(new Error('No item found'));
  }
  res.sendStatus(200);
});
internRouter.post('/cancel', authRole('ACADEMIC'), async (req, res) => {
  const _id = Object.keys(req.body)[0];
  
  const item = await Intern.updateOne({ _id: _id }, { $set: { status: false} });
  if (!item) {
    return next(new Error('No item found'));
  }
  res.sendStatus(200);
});
export default internRouter;
