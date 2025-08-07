# build environment
FROM node:16.20.0-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
ARG NODE_ENV=production
ARG VITE_API_BASE_URL=https://davidfischer.dev:5000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
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