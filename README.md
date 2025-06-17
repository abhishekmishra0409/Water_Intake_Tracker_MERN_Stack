# 💧 Water Intake Tracker (MERN Stack)

A full-stack web application to help users track their daily water intake, view progress, and stay hydrated. Built using MongoDB, Express.js, React, and Node.js.

---

## 🚀 Features

* User registration & login (JWT Auth)
* Secure backend API with token-based access
* Track water consumption
* View daily intake progress
* View intake history (by day)
* Clean and responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

* **Frontend**: React, Tailwind CSS, Axios, React Router
* **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt

---

## 📦 Installation

### 1. Clone the repository

```bash
https://github.com/abhishekmishra0409/Water_Intake_Tracker_MERN_Stack.git
cd Water_Intake_Tracker_MERN_Stack
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev # or npm start if CRA
```

---

## 🔑 API Endpoints

### Auth

* `POST /api/user/register`: Register user
* `POST /api/user/login`: Login and get token

### Water

* `POST /api/water/add`: Add intake (protected)
* `GET /api/water/today`: View today's progress (protected)
* `GET /api/water/history`: View historical intake (protected)

> 🔐 Protected routes require `Authorization: Bearer <token>` header.

---

## 🧪 Example Postman Flow

1. Register ➡️ Login ➡️ Copy token
2. Use token to call:

   * `/api/water/add`
   * `/api/water/today`
   * `/api/water/history`

---

## 👨‍💻 Author

**Abhishek Mishra**
[LinkedIn](https://linkedin.com/in/abhishekmishra04) • [Portfolio](https://abhishekmishra-0409.web.app)
📁 [GitHub Repository](https://github.com/abhishekmishra0409/Water_Intake_Tracker_MERN_Stack.git)
