import jwt from 'jsonwebtoken'

// Signs a JWT token using user dat

export const signAccessToken = (user) =>{
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m'}
    )
}

export const signRefreshToken = (user) => {
    return jwt.sign(
        {id: user._id},
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d'}
    )
}