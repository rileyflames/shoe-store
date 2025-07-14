// src/app.js
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";

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


export default app