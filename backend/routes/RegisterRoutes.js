import { upload } from '../middlewares/registerMulter.js';
import express from 'express';
import { getItems, addItem, downloadFile, getAllItems } from '../controllers/register.js';
import { authRole } from "../auth/authRoles.js";

const registerRouter = express.Router();
registerRouter.get('/',authRole('STUDENT'),getItems);
registerRouter.get('/list',authRole('ACADEMIC'),getAllItems);
registerRouter.route('/').post(authRole('STUDENT'),upload.single('file'), addItem);
registerRouter.route('/download/:id').get(downloadFile);

export default registerRouter;