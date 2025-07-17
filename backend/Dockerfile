# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install deps
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
