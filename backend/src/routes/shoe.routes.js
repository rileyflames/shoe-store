import express from "express";
import createShoe from '../controllers/shoes/createShoe.js'
import protect from '../middleware/protect.js'
import uploadImage from '../middleware/uploadImage.middleware.js'
import getAllShoes from "../controllers/shoes/getAllShoes.js";
import getShoeById from "../controllers/shoes/getShoeById.js";
import upload from "../middleware/uploadImage.middleware.js";
import updateShoe from "../controllers/shoes/updateShoe.js";
import softDeleteShoe from "../controllers/shoes/softDeleteShoe.js";
import authorize from "../middleware/authorize.js";
import restoreShoe from "../controllers/shoes/restoreShoe.js";
import permanentDeleteShoe from "../controllers/shoes/permanentlyDeleteShoe.js";

const router = express.Router()

// @route   POST /api/v1/shoes
// @desc    Create a new shoe
// @access  Protected
router.get('/', getAllShoes); // GET all shoes (public)
router.post('/', protect,authorize('admin','editor'), upload.single('image'), createShoe); // Create shoe (auth)


router.patch('/:id/soft-delete', protect,authorize('admin','editor'), softDeleteShoe); // Soft delete — must come BEFORE :id
router.patch('/:id/restore', protect,authorize('admin','editor'), restoreShoe)
router.delete('/:id/permanent', protect,authorize('admin') ,permanentDeleteShoe)


router.get('/:id', getShoeById); // Get one shoe by ID
router.patch('/:id', protect,authorize('admin','editor'), upload.single('image'), updateShoe); // Update shoe



/**
 * 🔁 Summary
 *  
 * | Route              | Purpose       | Notes                           |
| ------------------ | ------------- | ------------------------------- |
| `/`                | Get or create | Fine at the top                 |
| `/:id/soft-delete` | Soft delete   | Must come **before** `/:id`     |
| `/:id`             | Get by ID     | Must come **after** soft-delete |
| `/:id` (PATCH)     | Update by ID  | Shares same pattern as GET      |


 */

export default router
