// Import the winston logging library
import winston from "winston";

// Create a Winston logger instance
const logger = winston.createLogger({
    // Set the minimum level of messages to log (info and above)
    level: 'info',
    // Define the format for log messages
    format: winston.format.combine(
        winston.format.timestamp(), // Add a timestamp to each log entry
        winston.format.errors({stack: true}), // Include error stack traces
        winston.format.json() // Output logs in JSON format
    ),
    // Add default metadata to each log entry
    defaultMeta: { service: 'shoe-store' },
    // Define where logs should be written (called transports)
    transports: [
        // Write error-level logs to error.log
        new winston.transports.File({ 
            filename: 'src/logs/error.log', level: 'error'
        }),
        // Write all logs (info and above) to combined.log
        new winston.transports.File({ 
            filename: 'src/logs/combined.log'
        })
    ]
});

// Add a console transport so logs also appear in the terminal
// In production, use a simple format for console logs
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
} else {
    // In development, use colorized and simple format for easier reading
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

// Export the logger so it can be used in other files
export default logger