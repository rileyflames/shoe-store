import express from 'express'
import createUser from '../controllers/users/register.js'
import loginUser from '../controllers/users/login.js'
import protect from '../middleware/protect.js'
import logoutUser from '../controllers/users/logout.js'



const router = express.Router()

router.get('/me', protect, (req, res)=>{
    res.status(200).json({
        status: 'success',
        message : 'You are authenticated',
        user : req.user
    })
})

// register User route
router.post('/register', createUser)
router.post('/logout', logoutUser)

router.post('/login', loginUser)




export default router