// DataBase connection
import mongoose from "mongoose";
import logger from "../utils/winston.logger.js";

// Connect to MongoDB with exponential backoff and retry
export const connectDB = async () => {
    const maxRetries = 5; // Maximum number of retries
    let attempt = 0;
    let delay = 1000; // Initial delay in ms

    while (attempt < maxRetries) {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            logger.info(`✅ Connected to MongoDB`);
            return;
        } catch (error) {
            attempt++; // increase attempts after each connection attempt
            logger.error(`❌ MongoDB connection error (attempt ${attempt}): ${error}`);
            if (attempt < maxRetries) {
                logger.info(`Retrying MongoDB connection in ${delay / 1000} seconds...`);
                await new Promise(res => setTimeout(res, delay)); // set each attempt of reconnection to wait 1s
                delay *= 2; // Exponential backoff || multiply each delay by 2 to increase the amount of time taken before attempting to connect again
            } else {
                logger.error(`❌ Failed to connect to MongoDB after ${maxRetries} attempts. Exiting.`); // log the amount of times server tries to reconnect to database
                process.exit(1);
            }
        }
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




