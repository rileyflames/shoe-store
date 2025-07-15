// src/app.js
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import globalErrorHandler from "./middleware/errorHandler.js";
import routeNotFound from "./utils/routeNotFound.js";
import authRoutes from './routes/auth.routes.js'

// app instance
const app = express()


// Security middleware
app.use(helmet())
app.use(hpp())



// General Middleware
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// routes

app.get('/', (req, res)=>{
    res.send('🟢 API is up and running!')
})

// auth routes
app.use('/api/v1/auth', authRoutes)
























// Handler 404 for unmatched routes
app.use(routeNotFound);

// Error handling middleware

app.use(globalErrorHandler)

export default app