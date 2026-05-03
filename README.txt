TaskFlow - Full Stack Task Management Application

Live Application:
https://taskflow-frontend-production-65dc.up.railway.app/

--------------------------------------------------

Project Overview:
TaskFlow is a full-stack task management application that allows users to create, assign, and track tasks efficiently. It includes role-based access control, drag-and-drop functionality, and real-time task updates.

--------------------------------------------------

Features:
- User Authentication (Signup/Login)
- Role-based access (Admin / Member)
- Task creation, editing, and deletion
- Drag-and-drop task management
- Dashboard with task statistics
- Assign tasks to users
- Responsive UI

--------------------------------------------------

Tech Stack:

Frontend:
- React (Vite)
- Axios
- React Router
- Drag & Drop (@hello-pangea/dnd)

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt

Deployment:
- Railway (Frontend + Backend)

--------------------------------------------------

Project Structure:

taskflow/
   frontend/   -> React application
   backend/    -> Node.js backend API

--------------------------------------------------

Environment Variables:

Backend:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Frontend:
VITE_API_URL=https://taskflow-backend-production-7dd4.up.railway.app

--------------------------------------------------

How to Run Locally:

1. Clone repository
git clone https://github.com/your-username/taskflow.git
cd taskflow

2. Run Backend
cd backend
npm install
npm start

3. Run Frontend
cd frontend
npm install
npm run dev

--------------------------------------------------

Author:
Dikshanta Kumar Bharadwaj
