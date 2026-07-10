# -------------------------------------------------------
# Stage 1 - Build the React/Vite Application
# -------------------------------------------------------

# Use lightweight Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy application source code
COPY . .

# Enable MSW during Docker build
#
# This allows mocked API requests when running
# the application locally inside Docker.
ENV VITE_ENABLE_MSW=true

# Build the production application
RUN npm run build


# -------------------------------------------------------
# Stage 2 - Production Image
#
# Serve the built application using Nginx
# -------------------------------------------------------

FROM nginx:alpine

# Replace default Nginx configuration
#
# Supports React Router by redirecting
# unknown routes to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]