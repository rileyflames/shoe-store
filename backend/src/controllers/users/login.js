import loginSchema from "../../validation/login.validation.js";
import catchAsync from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";
import User from "../../models/users/Users.model.js";
import { signToken } from "../../utils/jwt.helper.js";

const loginUser = catchAsync( async ( req, res, next) => {
    // validate the request body against the schema (login input)
    const { identifier, password } = loginSchema.parse(req.body)

    // try to find user by email or username
    const user = await User.findOne({
        $or: [
            { email: identifier.toLowerCase() },
            { username : identifier }
        ]
    }).select('+password'); // select password explicitly for comparison

    // User not found?
    const isMatch = await user.correctPassword(password, user.password)
    if(!isMatch) {
        return next( new AppError('Invalid credentials', 401))
    }

    // Generate token
    const token = signToken(user)

    // Respond with token and user info
    res.status(200).json({
        staus : 'success',
        token,
        user: {
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })
    
})

export default loginUser