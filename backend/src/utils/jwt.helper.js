import jwt from 'jsonwebtoken'

// Signs a JWT token using user dat

export const signToken = (user) =>{
    const payload = {
        id : user._id,
        username : user.username,
        role : user.role
    }

    // Sign the token using the correct and expiry from environment variables
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_IN
    })

    return token
}