// import express from 'express'
// import dotenv from 'dotenv'
// import connectDb from './config/db.js'
// import cookieParser from 'cookie-parser'
// import authRoutes from './routes/authRoutes.js'
// dotenv.config()
// import cors from "cors"
// import userRoutes from './routes/userRoutes.js'
// import productRoutes from './routes/productRoutes.js'
// import cartRoutes from './routes/cartRoutes.js'
// import orderRoutes from './routes/orderRoutes.js'

// let port = process.env.PORT || 6000

// let app = express()

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//  origin:["http://localhost:5173" , "http://localhost:5174"],
//  credentials:true
// }))

// app.use("/api/auth",authRoutes)
// app.use("/api/user",userRoutes)
// app.use("/api/product",productRoutes)
// app.use("/api/cart",cartRoutes)
// app.use("/api/order",orderRoutes)




// app.listen(port,()=>{
//     console.log("Hello From Server")
//     connectDb();
// })


import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
console.log("ENV FILE PATH:", path.join(__dirname, ".env"));
import express from "express";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const port = process.env.PORT || 6000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    // Apne Vercel URL ko list mein add karein
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174", 
      "https://onecart-mocha.vercel.app" // Aapka Vercel URL
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"]
  })
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// Start server
app.listen(port, () => {
  console.log("Hello From Server");
  connectDb();
});