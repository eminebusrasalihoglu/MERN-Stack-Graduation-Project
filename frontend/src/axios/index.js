import { HTTP } from '../axios/config';
export const login = async (formData) =>
  await HTTP().post('/users/signin', formData);

export const signup = async (formData) =>
  await HTTP().post('/users/signup', formData);

// export const upload = async (formData) =>
//     await HTTP().post("/post/upload", formData);

export const internRegister = async (formData) =>
  await HTTP().post('/intern/register', formData);

export const companyForm = async (formData) =>
  await HTTP().post('/company/form', formData);

export const usersCount = async () => await HTTP().get('/users/count');

export const companyInfo = async () => await HTTP().get('/intern/companies');

export const internInfo = async () => await HTTP().get('/intern/info');

export const internConfirm = async (_id) =>
  await HTTP().post('/intern/confirm', _id);

export const internList = async () => await HTTP().get('/intern/list');

export const studentInfo = async () => await HTTP().get('/users/student');

export const adminInfo = async () => await HTTP().get('/users/admin'); //????

export const announcementRegister = async (formData) =>
  await HTTP().post('/announcement/create', formData);

export const announcementRegisterGet = async () =>
  await HTTP().get('/announcement/create');

export const announcementInfo = async () => await HTTP().get('/announcement');

export const surveyInfo = async () => await HTTP().get('/company/survey');

export const classInfo = async () => await HTTP().get('/admin/class');

export const companyStudentForm = async () =>
  await HTTP().get('/company/students');

export const academic = async () => await HTTP().get('/academic');
export const addAcademic = async (formData) =>
  await HTTP().post('/academic', formData);
export const getAllAcademics = async () => {
  try {
    const res = await HTTP().get('/academic/list');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getReportAssignment = async () => {
  //rapor için
  try {
    const res = await HTTP().get('/academic/reportAssignment');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAttendanceAssignment = async () => {
  try {
    const res = await HTTP().get('/academic/attendanceAssignment');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getRegisterAssignment = async () => {
  try {
    const res = await HTTP().get('/academic/registerAssignment');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const downloadAcademic = async (id) => {
  try {
    const res = await HTTP().get(`/academic/download/${id}`, {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], { type: res.data.type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'file.pdf';
    link.click();
  } catch (error) {
    console.log(error);
  }
};

export const getReports = async () => {
  try {
    const res = await HTTP().get('/report');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAllReports = async () => {
  try {
    const res = await HTTP().get('/report/list');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const downloadReport = async (id) => {
  try {
    const res = await HTTP().get(`/report/download/${id}`, {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], { type: res.data.type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'file.pdf';
    link.click();
  } catch (error) {
    console.log(error);
  }
};
export const getAttendances = async () => {
  try {
    const res = await HTTP().get('/attendance');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAllAttendances = async () => {
  try {
    const res = await HTTP().get('/attendance/list');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const downloadAttendance = async (id) => {
  try {
    const res = await HTTP().get(`/attendance/download/${id}`, {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], { type: res.data.type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'file.pdf';
    link.click();
  } catch (error) {
    console.log(error);
  }
};
export const getRegisters = async () => {
  try {
    const res = await HTTP().get('/register');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAllRegisters = async () => {
  try {
    const res = await HTTP().get('/register/list');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const downloadRegister = async (id) => {
  try {
    const res = await HTTP().get(`/register/download/${id}`, {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], { type: res.data.type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'file.pdf';
    link.click();
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnnouncement = async (_id) =>
  await HTTP().delete(`/announcement/delete/${_id}`);

export const deleteAssignment = async (_id) =>
  await HTTP().delete(`/academic/delete/${_id}`);

export const deleteClass = async (_id) =>
  await HTTP().delete(`/admin/delete/${_id}`);

export const createClass = async (formData) =>
  await HTTP().post('/admin/form', formData);

export const editClass = async (_id,formData) => await HTTP().put(`/admin/put/${_id}`,formData);

export const internCancel = async (_id) => await HTTP().post('/intern/cancel',_id);
