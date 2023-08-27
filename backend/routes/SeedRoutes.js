import express from 'express';
import Report from '../models/ReportModel.js';
import User from '../models/UserModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Report.remove({});
    console.log("data.reports", data.reports);
    const createdReports = await Report.insertMany(data.reports);
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdReports, createdUsers });
});
export default seedRouter;