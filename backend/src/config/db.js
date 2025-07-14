// DataBase connection
import mongoose from "mongoose";
import logger from "../utils/winston.logger.js";

const connectDB = async()=> {
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



export default connectDB

