# 🛍️ OneCart

OneCart is a full-stack e-commerce clothing store web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

The application provides a complete online shopping experience including product browsing, cart management, secure authentication, and an admin dashboard for managing products and orders.

---

## 🚀 Tech Stack

### 💻 Frontend
- React.js
- React Router DOM
- Axios
- CSS / Bootstrap / Tailwind (based on your implementation)

### 🖥️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### 🛠️ Admin Panel
- React-based Dashboard
- Role-based Access Control
- Product Management
- Order Management

---

## 📂 Project Structure

```
onecart/
│
├── frontend/        # Customer-facing React application
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── context/
│
├── backend/         # Node.js + Express REST API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
│
├── admin/           # Admin Dashboard (React)
│   ├── src/
│   ├── components/
│   └── pages/
│
└── README.md
```

---

## ✨ Features

### 🛒 Customer Features
- Browse clothing products
- View product details
- Add items to cart
- Update quantity
- Remove items from cart
- User registration & login
- Secure checkout
- View order history

### 🔐 Authentication & Authorization
- JWT-based authentication
- Protected routes
- Admin and User role separation

### 📦 Admin Features
- Add new products
- Edit product details
- Delete products
- View and manage orders
- Manage users

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/onecart.git
cd onecart
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### 4️⃣ Admin Panel Setup

```bash
cd admin
npm install
npm start
```

---

## 🔄 Sample API Endpoints

### Authentication
- POST /api/users/register
- POST /api/users/login

### Products
- GET /api/products
- POST /api/products (Admin only)
- PUT /api/products/:id (Admin only)
- DELETE /api/products/:id (Admin only)

### Orders
- POST /api/orders
- GET /api/orders/:id

---

## 📈 Future Enhancements
- Online payment integration (Stripe / Razorpay)
- Wishlist feature
- Product reviews & ratings
- Inventory tracking system
- Cloud deployment (Render / Vercel / AWS)

---

## 👨‍💻 Developer

OneCart Project

---

## 📄 License

This project is licensed under the MIT License.
