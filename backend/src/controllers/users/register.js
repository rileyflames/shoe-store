import User from '../../models/users/Users.model.js'
import createUserSchema from '../../validation/user.validation.js'
import catchAsync from '../../utils/catchAsync.js'
import { AppError } from '../../utils/AppError.js'


const createUser = catchAsync( async ( req, res, next ) =>{
    // Validate the request body against the schema
    const validatedData = createUserSchema.parse(req.body) // use createUserSchema to validate incoming data from frontend

    // check if user already exits in the database.
    const userExits = await User.findOne({ email: validatedData.email })
    if (userExits) {
        return next( new AppError('Email already in use', 400))
    }

    // if all everything checks out
    const newUser = await User.create(validatedData)

    // send responce 201
    res.status(201).json({
        status : 'success',
        user: {
            id : newUser._id,
            username : newUser.username,
            email : newUser.email
        }
    })
})





export default createUser