import express from "express";
import createShoe from '../controllers/shoes/createShoe.js'
import protect from '../middleware/protect.js'
import uploadImage from '../middleware/uploadImage.middleware.js'
import getAllShoes from "../controllers/shoes/getAllShoes.js";
import getShoeById from "../controllers/shoes/getShoeById.js";

const router = express.Router()

// @route   POST /api/v1/shoes
// @desc    Create a new shoe
// @access  Protected
router.get('/', getAllShoes)
router.post('/', protect,uploadImage.single('image'), createShoe)
router.get('/:id', getShoeById)


/**
 *  
 * | ✅ Benefit                    | 💬 Reason                                                                         |
    | ---------------------------- | --------------------------------------------------------------------------------- |
    | **Centralized upload logic** | One file controls file type, size, storage                                        |
    | **Easier maintenance**       | Update limits/filters in one place                                                |
    | **Cleaner route files**      | Route stays focused on purpose (not low-level config)                             |
    | **Reusability**              | Same middleware can be used for updating profile pics, multiple shoe images, etc. |

 */

export default router
