import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import ReportScreen from '../screens/ReportScreen';
import InternScreen from '../screens/InternScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import CompanyFormScreen from '../screens/CompanyFormScreen';
import AcademicFormScreen from '../screens/AcademicFormScreen';
import ReportListScreen from '../screens/ReportListScreen';
import AttendanceListScreen from '../screens/AttendanceListScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import StudentInfoScreen from '../screens/StudentInfoScreen';
import CompanyInfoScreen from '../screens/CompanyInfoScreen';
import SurveyInfoScreen from '../screens/SurveyInfoScreen.js';
import AnnouncementForm from '../screens/AnnouncementForm';
import AssignmentListScreen from '../screens/AssignmentListScreen';
import AdminTaskScreen from '../screens/AdminTaskScreen';
import RegisterFileScreen from '../screens/RegisterFileScreen';
import InternInfoScreen from '../screens/InternInfoScreen';
import InternConfirmScreen from '../screens/InternConfirmScreen';
import ClassScreen from '../screens/ClassScreen';
import RegisterListScreen from '../screens/RegisterListScreen';
export const Routess = ({ user }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen user={user}  />} />
        <Route path="/profile" element={<ProfileScreen user={user} />} />
        <Route exact path="/intern/confirm" element={<InternConfirmScreen/>} />
        <Route exact path="/intern/info" element={<InternInfoScreen />} />
        <Route exact path="/intern" element={<InternScreen />} />
        <Route path="/attendance" element={<AttendanceScreen />} />
        <Route path="/report" element={<ReportScreen />} />
        <Route path="/companyform" element={<CompanyFormScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/academic" element={<AcademicFormScreen />} />
        <Route path="/assignment" element={<AssignmentListScreen />} />
        <Route path="report/list" element={<ReportListScreen />} />
        <Route path="attendance/list" element={<AttendanceListScreen />} />
        <Route path="register/list" element={<RegisterListScreen />} />
        <Route path="/studentInfo" element={<StudentInfoScreen />} />
        <Route path="/companyInfo" element={<CompanyInfoScreen />} />
        <Route path="/surveyInfo" element={<SurveyInfoScreen />} />
        <Route path="/admin" element={<AdminTaskScreen />} />
        <Route path="/admin/class" element={<ClassScreen />} />
        <Route path="/announcement/create" element={<AnnouncementForm user={user} />} />
        <Route path="/register" element={<RegisterFileScreen />} />
        <Route path="*" element={<HomeScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </>
  );
};
