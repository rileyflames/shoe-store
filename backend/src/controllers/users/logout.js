import catchAsync from '../../utils/catchAsync.js'
import User from '../../models/users/Users.model.js'
import { AppError } from '../../utils/AppError.js'

/**
 * 🚪 Logout Controller
 * 
 * Steps:
 * 1. Get refresh token from cookie
 * 2. Find user with that token
 * 3. Remove that token from user's refreshTokens array
 * 4. Clear the cookie
 * 5. Return 204 No Content
 */

const logoutUser = catchAsync( async ( req, res, next) => {
    const token = req.cookies.refreshToken

    if(!token){
        return next(new AppError('No refresh token found', 400))
    }

    // Find the user with this refresh token
    const user = await User.findOne({refreshTokens : token}).select('+refreshTokens')

    if(user){
        user.refreshTokens = user.refreshTokens.filter(rt => rt !== token)
        await user.save({ validateBeforeSave: false})
    }

    // Clear the refresh token cookie in any case
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    })

    res.status(204).send() // No content
})

export default logoutUser
