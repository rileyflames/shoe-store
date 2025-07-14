// DataBase connection
import mongoose from "mongoose";
import logger from "../utils/winston.logger.js";

export const connectDB = async()=> {
    try {
        // connect database
        await mongoose.connect(process.env.MONGO_URI)
        //log the result if successful
        logger.info(`✅ Connected to MongoDB`)
    } catch (error) {
        // Catch error and exit
        logger.error(`❌ MongoDB connection error: ${error}`)
        process.exit(1)
    }
}


// Graceful shutdown
export const gracefulShutdown = async () => {
    try {
        // log message
        logger.info('Received kill signal, shutting down gracefully');
        // close mongoose connection (returns a Promise)
        await mongoose.connection.close();
        logger.info('MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        logger.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
}




