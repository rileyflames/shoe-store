import Shoe from '../../models/shoe/Shoe.model.js'
import catchAsync from '../../utils/catchAsync.js'
import { AppError } from '../../utils/AppError.js'
import mongoose from 'mongoose'

const softDeleteShoe = catchAsync(async (req, res, next) =>{
    // get id
    const { id } = req.params

    // Validate ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(AppError('Invalid shoe ID', 400))
    }

    const shoe = await Shoe.findById(id)
    if(!shoe){
        return next(new AppError('Shoe not found', 404))
    }

    // soft delete by setting isActive to false
    shoe.isActive = false
    await shoe.save()

    res.status(204).json({
        status: 'success',
        message: 'Shoe successfully soft-deleted',
        data: null
    })
})

export default softDeleteShoe