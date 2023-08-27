//draft data
import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            fullname: 'Emine',
            email: 'student@example.com',
            password: bcrypt.hashSync('123456'),
            userType: 'STUDENT',
            phoneNumber: '5565757544'
        },
        {
            fullname: 'Busra',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            userType: 'ADMIN',
            phoneNumber: '5454509974'
        },
    ],
    reports: [
        {
            name: 'report 1',
            info: 'uploaded',
            startDate: '12.10.2022',
            endDate: '14.10.2022',
        },
        {
            name: 'report 2',
            info: 'didnt upload',
            startDate: '16.12.2022',
            endDate: '19.01.2023',
        },
    ],
};
export default data;