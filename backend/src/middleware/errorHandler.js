import logger from "../utils/winston.logger.js"
import { AppError } from "../utils/AppError.js"


const globalErrorHandler = ( err, req, res, next) =>{
   const statusCode = err.statusCode || 500
   const status = err.status || 'error'

   // log the error
   logger.error({
    message : err.message,
    stack : err.stack,
    path : req.originalUrl,
    method : req.method
   })

   // Send JSON response
   res.status(statusCode).json({
    status,
    message: err.message || 'Something went wrong'
   })
}


export default globalErrorHandler