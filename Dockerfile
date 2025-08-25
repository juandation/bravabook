# Stage 1: Build Angular application
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build Angular app
RUN npm run build -- --configuration=production

# Stage 2: Create production image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built Angular app from previous stage
COPY --from=build /app/dist ./dist

# Copy server files
COPY server ./server

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server/server.js"]
