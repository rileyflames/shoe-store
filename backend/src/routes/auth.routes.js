import express from 'express'
import createUser from '../controllers/users/register.js'

const router = express.Router()

// register User route
router.post('/register', createUser)




export default router