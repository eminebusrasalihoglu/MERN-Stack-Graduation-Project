import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import conn from './db.js';
import seedRouter from './routes/SeedRoutes.js';
//import reportRouter from './routes/ReportRoutes.js';
import userRouter from './routes/UserRoutes.js';
import internRouter from './routes/InternRoutes.js';
import companyRouter from './routes/CompanyRoutes.js';
import academicRouter from './routes/AcademicRoutes.js';
import cors from "cors";
import announcementRouter from './routes/AnnouncementRoutes.js';
import { authUser } from './auth/authUser.js';
import { authRole } from './auth/authRoles.js';
import reportRouter from './routes/ReportRoutes.js';
import attendanceRouter from './routes/AttendanceRoutes.js';
import registerRouter from './routes/RegisterRoutes.js';
import adminRouter from './routes/AdminRoutes.js';
const app = express();

dotenv.config();

//connection to the DB
conn();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/seed', seedRouter);
app.use('/users', userRouter);
app.use('/academic',authUser, academicRouter);
app.use('/intern', authUser, internRouter);
app.use('/company', authUser, companyRouter);
app.use('/announcement',authUser, announcementRouter);
app.use('/report', authUser,reportRouter);
app.use('/attendance',authUser, attendanceRouter);
app.use('/register',authUser,registerRouter);
app.use('/admin', authUser, adminRouter);
app.get('/', (req, res) => {
    res.send("welcome to backend ^^ yee");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});