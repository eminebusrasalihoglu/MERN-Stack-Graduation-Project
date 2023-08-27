import { upload } from '../middlewares/reportMulter.js';
import express from 'express';
import { getItems, addItem, downloadFile,getAllItems } from '../controllers/reports.js';
import { authRole } from "../auth/authRoles.js";

const reportRouter= express.Router();

reportRouter.get('/',authRole('STUDENT'),getItems);
reportRouter.get('/list',authRole('ACADEMIC'),getAllItems);
reportRouter.route('/').post(authRole('STUDENT'),upload.single('file'), addItem);
reportRouter.route('/download/:id').get(downloadFile);

export default reportRouter;