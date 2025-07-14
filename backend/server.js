import dotenv from 'dotenv'
import app from './src/app.js'
import {connectDB, gracefulShutdown} from './src/config/db.js'
import logger from './src/utils/winston.logger.js'


dotenv.config()


// Handle process termination
process.on('SIGTERM', () => gracefulShutdown());
process.on('SIGINT', () => gracefulShutdown());


// Handle uncaught exceptions
process.on('uncaughtException', ( err) => {
    logger.error('Uncaught Exception: ', err)
    process.exit(1)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', ( err) => {
    logger.error('Unhandled Rejection: ', err)
    process.exit(1)
})

// Start the server
const startServer = async () => {
    // connect the database
    await connectDB();

    // PORT & server
    const PORT = process.env.PORT || 5000
    const server = app.listen(PORT, ()=>{
        logger.info(`Server running on http://localhost:${PORT}`);
        
    })
    // Handle server errors
    server.on('error', (error) => {
        logger.error('Server error: ', error);
        process.exit(1)
        
    })
}

// start server
startServer()