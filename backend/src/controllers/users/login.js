import loginSchema from "../../validation/login.validation.js";
import catchAsync from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";
import User from "../../models/users/Users.model.js";

const loginUser = catchAsync( async ( req, res, next) => {
    // validate the request body against the schema
    
})