import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import Academic from '../models/AcademicModel.js';
import Class from '../models/ClassModel.js';
import Intern from '../models/InternModel.js';
import jwt from 'jsonwebtoken';
import { authRole } from '../auth/authRoles.js';
import { authUser } from '../auth/authUser.js';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const {
      fullname,
      password,
      phoneNumber,
      email,
      userType,
      facultyType,
      passwordAgain,
      schoolNo,
      identifyNo,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (password != passwordAgain) {
      return res.status(400).json({ message: 'Your passwords do not match' });
    }
    if (userExists)
      return res
        .status(400)
        .json({ message: 'A user with this information already exists.' });
        
    let classCode="a";
    if(userType == "ACADEMIC"){
    const academicExists = await Class.countDocuments({ academic:email });
    if (academicExists<=0){
      return res
          .status(400)
          .json({ message: 'There is no such academician in the system.' });
    }
        
    }
    if(userType == "STUDENT" ){
     
    const studentExists = await Class.countDocuments({ students: email });
    if (studentExists<=0){
      return res
      .status(400)
      .json({ message: 'There is no such student in the system.' });
    }
    }
    if(userType == "FIRM"){
      const companyExists = await Intern.countDocuments({ firmEmail:email,"status":true });
      if (companyExists<=0){
        return res
        .status(400)
        .json({ message: 'Your company is not in the system or is not approved.' });
      }
         
      } 
    const hashedPassword = await bcrypt.hash(password, 10);
    if(userType == "FIRM"){
      const companyExists = await Intern.findOne({ firmEmail:email,"status":true });
      classCode = companyExists.classCode;
    }
    else if(userType == "ACADEMIC"){
      const aExist = await Class.findOne({ academic:email});
      classCode = aExist.classCode;
    }
    else{
      const sExist = await Class.findOne({ students:email});
      classCode = sExist.classCode;
    }
    const createdUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      userType,
      facultyType,
      identifyNo,
      schoolNo,
      classCode,
    });
    return res.json({ message: 'User has been created.' });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'There is no such user.' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Your password is incorrect.' });

    const accessToken = jwt.sign(
      { email: email, userType: user.userType,fullname:user.fullname,classCode:user.classCode },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30000s' }
    );

    return res.status(200).json({ user, accessToken });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

userRouter.get('/count',authUser, async (req, res) => {
  const classCode = req.tokenPayload.classCode;
  const today = new Date();
  const users = await User.countDocuments({ userType: 'STUDENT' });
  const firms = await User.countDocuments({ userType: 'FIRM' });
  const activities = await Academic.countDocuments({ "startDate": { $lte: today } ,"endDate": { $gte: today },classCode:classCode });
  res.send({ users, firms,activities });
});
userRouter.get('/student', authUser,authRole('ACADEMIC'), async (req, res) => {
  const classCode = req.tokenPayload.classCode;
  const students = await User.find({ userType: 'STUDENT',classCode:classCode });
  res.send(students);
});



export default userRouter;
