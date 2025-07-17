import Shoe from '../../models/shoe/Shoe.model.js'
import catchAsync from '../../utils/catchAsync.js'
import { AppError } from '../../utils/AppError.js'

const permanentDeleteShoe = catchAsync(async (req, res, next)=>{
    const { id } = req.params

    const shoe = await Shoe.findById(id)

    if(!shoe){
        return next(new AppError('Shoe not found', 404))
    }

    await shoe.deleteOne()

    res.status(204).json({
        status: 'success',
        message: 'Shoe permanently deleted'
    })
})

export default permanentDeleteShoe