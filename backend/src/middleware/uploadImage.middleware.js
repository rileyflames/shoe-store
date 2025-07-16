import multer from 'multer'
import { AppError } from '../utils/AppError.js'

// Use memory storage for temporary in-RAM storage (we pipe to cloudinary)
const storage = multer.memoryStorage()

// filter only image files
const fileFilter = ( req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true) // Accept
    }else {
        cb(new AppError('Only image files are allowed', 400), false) // Reject
    }
}

// 5MB file size limit
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

/**
 *  🔍 How It Works:
    | Middleware Part   | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `memoryStorage()` | Keeps image in memory (does not write to disk) |
| `fileFilter`      | Only allows images like `.png`, `.jpg`         |
| `limits.fileSize` | Max file size (5MB here)                       |

The image will be available on req.file inside your controller

You can pass req.file.buffer to uploadImage() to send it to Cloudinary


. multer.memoryStorage()
memoryStorage() tells multer:

“Hold this file in RAM temporarily — don’t save it to disk.”

This gives you access to req.file.buffer, which you can upload to Cloudinary.

2. fileFilter: (req, file, cb) => { ... }
A custom function that multer calls to decide if it should accept or reject the file.

cb(null, true) = accept

cb(new AppError(...), false) = reject with error

It’s a safety net to prevent .exe, .zip, or other risky formats.

3. limits: { fileSize: 5 * 1024 * 1024 }
File size limit in bytes

This sets a 5MB cap

You can tweak this if you expect high-res images or want to save bandwidth.

 */

export default upload
