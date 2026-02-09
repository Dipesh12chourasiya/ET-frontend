# AI powered Expense Tracker Web Application

A full-stack **Expense Tracker** built using **React + Vite** on the frontend and **Node.js, Express, MongoDB** on the backend.  
The app helps users manage expenses, track spending trends, and generate **AI-powered financial reports**.

---

## 🚀 Features

### 🔐 Authentication & Users
- User registration & login (JWT based)
- Protected routes for authenticated users
- User profile management

### 🗂️ Categories
- Create, update, and view expense categories
- Category-wise expense tracking

### 💸 Transactions
- Add income and expense transactions
- View all transactions securely
- Monthly expense calculation

### 📊 Analytics
- Monthly expense trend visualization
- Interactive charts (Chart.js)
- Dashboard with financial insights

### 🤖 AI-Powered Reports
- AI-generated **monthly financial report**
- Smart analysis of spending behavior
- Download AI report as PDF

---

## 🧩 Backend API Routes

```js
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/ai", aiRoutes);

🛠️ Tech Stack

Frontend

React + Vite

React Router

React Query

Tailwind CSS

Chart.js

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

OpenAI API (AI Reports)

🌐 Deployment

Frontend: Vercel

Backend: Vercel

Database: MongoDB Atlas
