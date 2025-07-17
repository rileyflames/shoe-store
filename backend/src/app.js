// src/app.js
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import cors from 'cors'
import compression from "compression";
import globalErrorHandler from "./middleware/errorHandler.js";
import routeNotFound from "./utils/routeNotFound.js";
import authRoutes from './routes/auth.routes.js'
import shoeRoutes from './routes/shoe.routes.js'

// app instance
const app = express()


// Security middleware
app.use(helmet())
app.use(hpp())



// General Middleware
app.use(cookieParser())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))


// routes

app.get('/', (req, res)=>{
    res.send('🟢 API is up and running!')
})

// auth routes
app.use('/api/v1/auth', authRoutes)

// shoe routes
app.use('/api/v1/shoes', shoeRoutes)
























// Handler 404 for unmatched routes
app.use(routeNotFound);

// Error handling middleware

app.use(globalErrorHandler)

export default app