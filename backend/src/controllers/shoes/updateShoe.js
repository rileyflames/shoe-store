import shoe from '../../models/shoe/Shoe.model.js'
import catchAsync from '../../utils/catchAsync.js'
import uploadImage from '../../utils/uploadImage.js'
import { AppError } from '../../utils/AppError.js'
import createShoeSchema from '../../validation/shoe.validation.js'
import mongoose from 'mongoose'
import Shoe from '../../models/shoe/Shoe.model.js'

const updateShoe = catchAsync(async (req, res, next)=>{
    //get id
    const { id } = req.params

    // Validate Id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new AppError('Invalid shoe ID', 400))
    }

    // Check if shoe exists
    const shoe = await Shoe.findById(id)
    if(!shoe){
        return next(new AppError('Shoe not found', 404))
    }

    // Validate input body( partial updates allowed)
    const partialSchema = createShoeSchema.partial(); // all fields optional
    const validatedData = partialSchema.parse(req.body)

    // Handle optional new image
    if(req.file){
        const imageUrl = await uploadImage(req.file.buffer, 'shoes')
        validatedData.images = [{url: imageUrl, isPrimary: true}]
    }

    // Apply updates
    Object.assign(shoe, validatedData)
    await shoe.save()

    res.status(200).json({
        status : 'success',
        data: { shoe }
    })
})

export default updateShoe