import Shoe from '../../models/shoe/Shoe.model.js'
import catchAsync from '../../utils/catchAsync.js'
import { AppError } from '../../utils/AppError.js'

const restoreShoe = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const shoe = await Shoe.findById(id)

  if (!shoe) {
    return next(new AppError('Shoe not found', 404))
  }

  if (shoe.isActive) {
    return next(new AppError('Shoe is not deleted', 400))
  }

  shoe.isActive = true // ✅ restoring it
  await shoe.save()

  res.status(200).json({
    status: 'success',
    message: 'Shoe restored successfully',
    data: { shoe },
  })
})

export default restoreShoe
