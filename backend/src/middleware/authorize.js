import { AppError } from '../utils/AppError.js'



/** 
 * Role-based authorization middleware
 * @params {...string} roles Allowed roles(eg., 'admin', 'editor')
*/

const authorize = (...roles) => {
    return( req, res, next)=>{
        if(!req.user || !roles.includes(req.user.role)){
            return next(new AppError('You are not authorized to perfom this action', 403))
        }
        next()
    }
}

export default authorize