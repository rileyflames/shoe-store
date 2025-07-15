import jwt from 'jsonwebtoken'
import { AppError } from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

// Middleware to protect private routes
const protect = catchAsync(async ( req, res, next) =>{
    let token;

    // Extract token from Authorization header: "Bearer <token>"
    if(
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1]
        console.log('Extracted token', token);
        
    }

    // if no token, deny access
    if(!token){
        return next(new AppError('You are not logged in. Please login to access', 401))
    }

    // Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach decoded user info to request object
    req.user = {
        id : decoded.id,
        username : decoded.username,
        role : decoded.role
    }

    next()
})

/**
 *  | Step           | Why                                                              |
| -------------- | ---------------------------------------------------------------- |
| Extract token  | Looks inside the `Authorization` header (`Bearer token`)         |
| Check presence | Denies access if no token is found                               |
| Verify token   | Uses JWT secret to validate token integrity and expiry           |
| Attach user    | Stores `req.user` so future middleware/controllers can access it |



Common Use Cases
| Scenario                      | Route                        | Why use `protect`?                             |
| ----------------------------- | ---------------------------- | ---------------------------------------------- |
| 👤 Get current user’s profile | `GET /api/v1/users/me`       | You need to know who's logged in               |
| 📝 Update user profile        | `PATCH /api/v1/users/update` | Only the logged-in user should edit their data |
| 📦 Add/edit/delete shoes      | `POST /api/v1/shoes`         | Only admins or editors should manage products  |
| 💳 View orders                | `GET /api/v1/orders/:id`     | Must be the owner or an admin                  |
| 🧱 Admin dashboard            | `GET /api/v1/admin/stats`    | Only authenticated admins allowed              |


 */

export default protect