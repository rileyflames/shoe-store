// src/app.js
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import globalErrorHandler from "./middleware/errorHandler.js";
import { AppError } from "./utils/AppError.js";

// app instance
const app = express()


// Security middleware
app.use(helmet())
app.use(hpp())



// General Middleware
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res)=>{
    res.send('🟢 API is up and running!')
})

// Handler 404 for unmatched routes
app.all('*', (req, res, next)=>{
    next( new AppError(`Can't find ${req.originalUrl}`, 404))
})

// Error handling middleware

app.use(globalErrorHandler)

export default app