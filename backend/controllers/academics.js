import Academic from '../models/AcademicModel.js';
import path from 'path';
import moment from 'moment';
import asyncWrapper from '../middlewares/asyncWrapper.js';
const __dirname = path.resolve();

export const addItem = asyncWrapper(async (req, res) => {
  const classCode = req.tokenPayload.classCode;
  let { fileName, startDate, endDate, fileType } = req.body;
  startDate = moment(startDate).startOf('day').utc().format();
  endDate = moment(endDate).endOf('day').utc().format();
  const academicMail = req.tokenPayload.email;
  const file = req?.file?.path;
  const item = await Academic.create({
    fileName,
    startDate,
    endDate,
    fileType,
    file,
    academicMail,
    classCode,
  });
  res.status(201).json({ item });
});

export const getAllItems = async (req, res) => {
  //for academics
  try {
    const classCode = req.tokenPayload.classCode;
    const items = await Academic.find({ classCode: classCode });
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};
export const getAssignment = async (req, res) => {
  //for students reports
  try {
    const today = new Date();
    const studentMail = req.tokenPayload.email;
    const classCode = req.tokenPayload.classCode;
    // If the student's name is available after uploading and they haven't uploaded yet, say 'view', but it hasn't been done yet.
    //const assignments = await Academic.find({ "students.name": "ebs@gmail.com", "students.status": true,"fileType":"report" });
    const assignments = await Academic.find({
      students: { $nin: [studentMail] },
      classCode: classCode,
      fileType: 'report',
      startDate: { $lte: today },
      endDate: { $gte: today },
    });
    res.status(200).json({ assignments });
  } catch (error) {
    console.log(error);
  }
};
export const getAttendanceAssignment = async (req, res) => {
  //for students attendance reports
  try {
    const today = new Date();
    const studentMail = req.tokenPayload.email;
    const classCode = req.tokenPayload.classCode;
    const attendanceAssignments = await Academic.find({
      students: { $nin: [studentMail] },
      classCode: classCode,
      fileType: 'attendance',
      startDate: { $lte: today },
      endDate: { $gte: today },
    });
    res.status(200).json({ attendanceAssignments });
  } catch (error) {
    console.log(error);
  }
};
export const getRegisterAssignment = async (req, res) => {
  //for students registration reports 
  try {
    const today = new Date();
    const studentMail = req.tokenPayload.email;
    const classCode = req.tokenPayload.classCode;
    const registerAssignments = await Academic.find({
      students: { $nin: [studentMail] },
      classCode: classCode,
      fileType: 'register',
      startDate: { $lte: today },
      endDate: { $gte: today },
    });
    res.status(200).json({ registerAssignments });
  } catch (error) {
    console.log(error);
  }
};
export const downloadFile = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const item = await Academic.findById(id);
  if (!item) {
    return next(new Error('No item found'));
  }
  const file = item.file;
  const filePath = path.join(__dirname, `${file}`);
  res.download(filePath);
});

export const deleteItem = async (req, res) => {
  const _id = req.params.id;
  console.log(req.params);
  const item = await Academic.findByIdAndRemove(_id);
  if (!item) {
    return next(new Error('No item found'));
  }
  res.sendStatus(200);
};
