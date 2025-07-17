import Shoe from '../../models/shoe/Shoe.model.js'
import catchAsync from '../../utils/catchAsync.js'
import {AppError} from '../../utils/AppError.js'

/**
 * @desc    Get a single shoe by ID
 * @route   GET /api/v1/shoes/:id
 * @access  Public
 */

const getShoeById = catchAsync(async (req, res, next) => {
    const { id } = req.params

    // try to find the shoe
    const shoe = await Shoe.findById(id)

    // if no shoe found, trigger global error handler
    if(!shoe) {
        return next(new AppError('Shoe not found', 404))
    }

    // if found send shoe data
    res.status(200).json({
        status: 'success',
        data : shoe
    })
})

export default getShoeById