import Shoe from '../../models/shoe/Shoe.model.js'
import catchAsync from '../../utils/catchAsync.js'
import {AppError} from '../../utils/AppError.js'

/**
 * @desc    Get a single shoe by ID
 * @route   GET /api/v1/shoes/:id
 * @access  Public
 */

const getShoeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Fetch even soft-deleted shoes
  const shoe = await Shoe.findById(id);

  if (!shoe) {
    return next(new AppError("Shoe not found", 404));
  }

  // If soft-deleted AND user is not editor/admin, hide it
  if (!shoe.isActive) {
    if (!req.user || !['admin', 'editor'].includes(req.user.role)) {
      return next(new AppError("Shoe not found", 404));
    }

    // ⚠️ Warn editors/admins
    return res.status(200).json({
      status: "warning",
      message: "This shoe has been soft-deleted.",
      data: shoe,
    });
  }

  // Return normally for active shoes
  res.status(200).json({
    status: "success",
    data: shoe,
  });
});


export default getShoeById