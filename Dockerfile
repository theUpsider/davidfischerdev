# build environment - using standard node image instead of alpine
FROM node:18-slim AS build

# Install necessary packages for building
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Set environment for better compatibility
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false && npm cache clean --force

# Copy source code
COPY . ./

# Set build arguments and environment
ARG NODE_ENV=production
ARG VITE_API_BASE_URL=https://api.davidfischer.dev
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV NODE_ENV=$NODE_ENV

# Build the application
RUN npm run build-prod

# production environment
FROM nginx:stable-alpine
# Install curl for health checks
RUN apk add --no-cache curl
# Overrite the config file. Fixes for react router by directing all requests to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/config
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]