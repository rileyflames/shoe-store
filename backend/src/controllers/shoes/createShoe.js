import Shoe from "../../models/shoe/Shoe.model.js";
import catchAsync from '../../utils/catchAsync.js'
import uploadImage from '../../utils/uploadImage.js'
import { AppError } from '../../utils/AppError.js'
import createShoeSchema from "../../validation/shoe.validation.js";

// Controller to create a new shoe
const createShoe = catchAsync(async ( req, res, next )=> {
    // Validate body
    const validatedData = createShoeSchema.parse(req.body)

    // check for image
    if(!req.file) {
        return next(new AppError('Image file is required', 400))
    }

    // Upload image to cloudinary
    const imageUrl = await uploadImage( req.file.buffer, 'shoes')

    // Create the shoe document
    const shoe = await Shoe.create({
        ...validatedData,
        images: [{ url: imageUrl, isPrimary: true}],
        createdBy: req.user.id
    })

    // Respond
    res.status(201).json({
        status: 'success',
        data :{
            shoe
        }
    })
})




/**
 * Controller Summary
 * 
 * | Step            | Action                                             |
    | --------------- | -------------------------------------------------- |
    | ✅ Validation    | Uses `zod` to validate name, price, category, etc. |
    | 🖼️ Image Check | Throws error if image not uploaded                 |
    | ☁️ Upload       | Sends image to Cloudinary using the buffer         |
    | 💾 Create       | Stores shoe with embedded image URL                |
    | 🔐 createdBy    | Tracks the user who added the shoe                 |

 */

export default createShoe
