import dotenv from 'dotenv'
import app from './src/app.js'
import connectDB from './src/config/db.js'
import logger from './src/utils/winston.logger.js'


dotenv.config()


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