import { upload } from '../middlewares/attendanceMulter.js';
import express from 'express';
import { getItems, addItem, downloadFile, getAllItems } from '../controllers/attendances.js';
import { authRole } from "../auth/authRoles.js";

const attendanceRouter = express.Router();
attendanceRouter.get('/',authRole('STUDENT'),getItems);
attendanceRouter.get('/list',authRole('ACADEMIC'),getAllItems);
attendanceRouter.route('/').post(authRole('STUDENT'),upload.single('file'), addItem);
attendanceRouter.route('/download/:id').get(downloadFile);

export default attendanceRouter;