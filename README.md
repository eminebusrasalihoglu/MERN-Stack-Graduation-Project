# Internship Platform 
## Table of Contents
1. Project Overview
    1. User Roles
    2. Features
	3. Tech Stack
2. Prerequisites
3. Getting Started
4. Project Structure
5. Usage
6. Contributing

## Project Overview
The aim of this project is to address the communication, integrity, document submissions, internship registration, internship evaluation, and internship approval issues encountered by students during their internship periods.
#### User Roles
- **Student** : Registered students accessing academic and internship-related features.
- **Academician** : Faculty members who oversee student internships, manage academic tasks, and communicate with students and companies.
- **Company** : Employers who register and evaluate students during internships.
- **Admin** : Administrators responsible for system management, including user assignment and class creation.

#### Tech Stack
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a>     <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>       <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>

- **Frontend** (React): The user interface of our application is developed using React, a popular JavaScript library for building dynamic and responsive web pages. React provides a seamless and efficient way to create interactive user interfaces.

- **Backend API** (Node.js, Express.js): To handle server-side operations and serve as the communication bridge between the frontend and the database, I employed Node.js along with Express.js. Node.js is a runtime environment that allows us to run JavaScript on the server, while Express.js simplifies the creation of RESTful APIs.

- **Database** (MongoDB): For data storage and retrieval, I opted for MongoDB, a NoSQL database that is well-suited for handling JSON-like documents. MongoDB's flexibility and scalability make it an excellent choice for our project.
#### Features
- Creating Classes
- Viewing Classes
- Internship Registration
- Opening Report Upload Area
- Uploading Reports
- Listing Students
- Approving Internships
- Creating Announcements
- Filling out Surveys
- Viewing Surveys
- Approving Users
- Viewing Companies

## Prerequisites
Before you begin, ensure you have met the following requirements:

- **Node.js** installed on your machine (preferably version 16.10.0).
- A code editor of your choice (e.g., **Visual Studio Code**). 
- **MongoDB **configuration = You must have an MongoDB account. If you don't have one, you can sign up for a free account at MongoDB Atlas. Create a database cluster within your MongoDB Atlas account. This cluster will serve as the backend data store for your MERN application.Obtain the connection string for your MongoDB Atlas cluster. This connection string includes authentication credentials and details about your cluster. You'll need to configure your Node.js backend to use this connection string to connect to the database.

## Getting Started
1.  Clone the repository to your local machine:
```bash
git clone https://github.com/eminebusrasalihoglu/MERN-Stack-Graduation-Project.git
```
2. Open the terminal and change into the project directory (Frontend):
```shell
cd frontend
```
3. Install the project dependencies:
```shell
npm i 
```
4. Start the frontend
```shell
npm start
```
5. Open the terminal and change into the project directory (Backend):
```shell
cd backend
```
6. Install the project dependencies:
```shell
npm i 
```
7. Configure the database
You must change db.js and .env file

8. Start the backend
```shell
npm start
```
9. Open your web browser and access the application at http://localhost:3000 .

## Project Structure
mern-stack-internship/ <br>
│ <br>
├── frontend/         # Frontend (React) code  <br>
│   ├── public/     # Public assets (HTML, CSS, images) <br>
│   ├── package.json    # Project dependencies and scripts <br>
│   └── src/        # React components and application logic <br>
│ <br>
├── backend/         # Backend (Node.js & Express) code <br>
│   ├── auth/     # Authorization files <br>
│   ├── controllers/ # Request handlers <br>
│   ├── middlewares/ # Request handlers <br>
│   ├── models/     # Data models <br>
│   ├── routes/     # API routes <br>
│   ├── attendanceUploads/     # Uploaded attendance files <br>
│   ├── reportUploads/     # Uploaded report files <br>
│   ├── registerUploads/     # Uploaded register files <br>
│   ├── db.js      # MongoDB connection file <br>
│   ├── .env    # Example environment variable configuration <br>
│   ├── package.json    # Project dependencies and scripts <br>
│   └── server.js   # Node.js server entry point <br>
│
├── .gitignore      # Specifies files/folders to be ignored by Git <br>
├── README.md      # Project README file  <br>

## Usage
coming soon
###### Happy coding ✨
