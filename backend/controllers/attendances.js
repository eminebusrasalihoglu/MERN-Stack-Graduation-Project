import Attendance from '../models/AttendanceModel.js';
import Academic from '../models/AcademicModel.js';
import path from 'path';
import asyncWrapper from '../middlewares/asyncWrapper.js';
const __dirname = path.resolve();

export const getItems = async (req, res) => {
  try {
    const studentMail = req.tokenPayload.email;
    const items = await Attendance.find({ studentMail: studentMail });
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};
export const getAllItems = async (req, res) => {
  //for academics
  try {
    const classCode = req.tokenPayload.classCode;
    const items = await Attendance.find({ classCode: classCode });
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};
export const addItem = asyncWrapper(async (req, res) => {
  const { name, assignmentId } = req.body;
  const studentMail = req.tokenPayload.email;
  const classCode = req.tokenPayload.classCode;
  const file = req.file.path;
  try {
    const belge = await Academic.findById(assignmentId); 
    if (belge) {
      belge.students.push(studentMail); 

      await belge.save(); 

      console.log('New item has been successfully added.');
    } else {
      console.log('Document not found.');
    }
  } catch (error) {
    console.error('Changes could not be saved: ', error);
  }

  const item = await Attendance.create({ name, file, studentMail, classCode });
  res.status(201).json({ item });
});

export const downloadFile = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const item = await Attendance.findById(id);
  if (!item) {
    return next(new Error('No item found'));
  }
  const file = item.file;
  const filePath = path.join(__dirname, `${file}`);
  res.download(filePath);
});
