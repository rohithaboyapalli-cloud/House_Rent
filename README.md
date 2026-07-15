# 🏠 HouseRent - MERN Stack House Rental Platform

A full-stack House Rental Management System built using the MERN Stack. The platform allows users to browse rental properties, owners to manage their listings, and administrators to approve owners and manage the entire system.

---

## 🚀 Features

### 👤 User
- Register and Login with JWT Authentication
- Browse available rental properties
- View detailed property information
- Book rental properties
- View booking history
- Edit profile
- Forgot Password via Email
- Reset Password

### 🏡 Owner
- Owner Registration
- Admin Approval Required
- Add New Properties
- Edit Property Details
- Delete Properties
- Upload Multiple Property Images
- View Property Bookings
- Manage Listed Properties

### 🛡️ Admin
- Admin Dashboard
- View All Users
- Approve/Reject Owner Requests
- Manage Properties
- Manage Bookings
- Monitor Platform Activities

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js
- Nodemailer
- Multer
- Cloudinary

---

## 📂 Project Structure

```
HouseRent/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication

- JWT Authentication
- Protected Routes
- Role-Based Access Control
- User
- Owner
- Admin

---

## 📸 Image Upload

Property images are uploaded using:

- Cloudinary
- Multer
- Multer Storage Cloudinary

---

## 📧 Email Functionality

- Forgot Password
- Password Reset Link
- Gmail SMTP using Nodemailer

---

## 🗄️ Database

MongoDB Collections

- Users
- Properties
- Bookings

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/rohithaboyapalli-cloud/House_Rent.git
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

CLIENT_URL=http://localhost:5173
```

---

## 📌 Future Improvements

- Online Payment Integration
- Property Search Filters
- Wishlist Feature
- Reviews & Ratings
- Notifications
- Live Chat
- Admin Analytics Dashboard

---

## 📷 Screenshots

Add your screenshots inside a folder named:

```
screenshots/
```

Example:

```
screenshots/
├── home.png
├── login.png
├── property-details.png
├── owner-dashboard.png
├── admin-dashboard.png
```

---

## 👨‍💻 Author

**Revathi Veeraboyani**

GitHub:
https://github.com/rohithaboyapalli-cloud

---

## ⭐ Support

If you like this project, don't forget to ⭐ the repository.
