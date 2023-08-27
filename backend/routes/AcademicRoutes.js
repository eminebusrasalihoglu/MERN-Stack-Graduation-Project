import express from 'express';
import { upload } from '../middlewares/academicMulter.js';
import {
  addItem,
  downloadFile,
  getAllItems,
  getAssignment,
  getAttendanceAssignment,
  getRegisterAssignment,
  deleteItem,
} from '../controllers/academics.js';
import { authRole } from '../auth/authRoles.js';
const academicRouter = express.Router();

academicRouter.get('/', async (req, res) => {
  console.log('Check it...');
});
academicRouter.route('/download/:id').get(downloadFile);
academicRouter.get('/list', authRole('ACADEMIC'), getAllItems);
academicRouter.get('/reportAssignment', authRole('STUDENT'), getAssignment);
academicRouter.get(
  '/attendanceAssignment',
  authRole('STUDENT'),
  getAttendanceAssignment
);
academicRouter.get(
  '/registerAssignment',
  authRole('STUDENT'),
  getRegisterAssignment
);
academicRouter
  .route('/')
  .post(authRole('ACADEMIC'), upload.single('file'), addItem);
academicRouter.delete('/delete/:id', authRole('ACADEMIC'), deleteItem);
export default academicRouter;
