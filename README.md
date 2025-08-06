# CodeCollaby

CodeCollaby is a real-time code collaboration platform that allows developers to write, edit, and run code together—anytime, anywhere. Built for distributed teams and coding partners, it supports instant code syncing, multiple languages, live execution, and a seamless collaboration experience.

## Website

[https://codecollaby-frontend.onrender.com/](https://codecollaby-frontend.onrender.com/)

---

##Features

1. **Real-Time Code Collaboration**  
   Multiple users can edit code simultaneously and see changes live.

<!-- Example image from Google Drive -->
![CodeCollaby Screenshot](https://drive.google.com/uc?id=12A-Z7-FJMxfsul7_rH9GMaJHRoe2egI_)


2. **Live Code Execution**  
   Run your code directly within the platform and see output instantly.  
   ![CodeCollaby Screenshot](https://drive.google.com/uc?id=17pOlhgNC1rT8ShxJ1JGPDtdEUtsWGtFq)

4. **Multi-Language Support**  
   Supports JavaScript, Python, Java, and C++ with syntax highlighting.

5. **Room-Based Collaboration**  
   Create private or public rooms and share them with your team to code together.  
   ![CodeCollaby Screenshot](https://drive.google.com/uc?id=1vlYqC6bD75CueMsxt8eTdoTk5bVmndGO)


7. **Authentication**  
   Secure login/signup for users to access rooms and collaborate safely.

---

##  Tech Stack

- **Frontend**: React.js + Tailwind CSS  
- **Backend**: Node.js + Express.js  
- **Real-Time Communication**: Socket.IO  
- **Compiler Service**: Custom API for live code execution  
- **Database**: MongoDB  
- **State Management**: Recoil (React)  
- **Authentication**: JWT-based Auth System

---

##  Project Structure

```
CodeCollaby/
├── frontend/         # React app with Tailwind and Recoil
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── ...
├── backend/          # Express server with Socket.IO and MongoDB
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── ...
```

---

## 📸 Pages

1. **Home Page**
2. **About Page**
3. **Login / Sign Up**
4. **Collaborate Page (Live Editor + Execution )**
5. **Create Room Page**

---

##  Getting Started

### 🛠 Prerequisites

- Node.js (v14+)
- MongoDB

###  Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/codecollaby.git
   cd codecollaby
   ```

2. **Install Dependencies**

   - Backend:
     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Environment Setup**

   In `backend/.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/codecollaby
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the Application**

   - Start backend server:
     ```bash
     cd backend
     npm run dev
     ```

   - Start frontend server:
     ```bash
     cd ../frontend
     npm run dev
     ```

5. **Access the App**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Usage

1. **Sign Up or Log In**
2. **Create a Collaboration Room**
3. **Invite Collaborators via Room Link**
4. **Start Coding Together**
5. **Run the Code & View Output**
6. **Chat and Discuss (Coming Soon)**

---

##  Future Scope

-  AI Suggestions for Code Optimization
-  Live Chat and Audio Room Integration
-  Mobile App for Android and iOS
-  Test Case Support for Submitted Code
-  OAuth & GitHub Sign-In Support

---


##  License

This project is licensed under the [MIT License](LICENSE).

---

##  Contact

**CodeCollaby Team**  
 Email: [codecollabyy@gmail.com](mailto:codecollabyy@gmail.com) 
 Delhi, India  

© 2025 Code Collaby. All rights reserved.
