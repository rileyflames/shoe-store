import express from 'express'
import createUser from '../controllers/users/register.js'
import loginUser from '../controllers/users/login.js'

const router = express.Router()

// register User route
router.post('/register', createUser)


router.post('/login', loginUser)




export default router