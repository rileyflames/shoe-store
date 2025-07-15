// src/utils/uploadImage.js
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

/**
 * Uploads an image buffer to Cloudinary using an upload stream
 * @param {Buffer} buffer - The image file buffer (from multer memoryStorage)
 * @param {string} folder - Optional folder name to group images in Cloudinary
 * @returns {Promise<string>} The secure URL of the uploaded image
 */
const uploadImage = (buffer, folder = 'shoes') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url); // Return Cloudinary image URL
      }
    );

    // Turn buffer into a readable stream and pipe it into the upload stream
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/**
 *  | Step                                | What it does                                                     |
| ----------------------------------- | ---------------------------------------------------------------- |
| `streamifier`                       | Turns the file buffer into a stream                              |
| `cloudinary.uploader.upload_stream` | Asynchronously uploads the image to Cloudinary                   |
| `folder`                            | Groups the uploaded images under a "shoes/" folder in Cloudinary |
| `resolve(result.secure_url)`        | We return the **image URL** to store in MongoDB                  |

 */


export default uploadImage;
