<<<<<<< HEAD
FROM node:18-alpine AS builder
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
RUN npm run build -- --configuration production
 
FROM nginx:alpine
 
COPY --from=builder /app/dist/book-my-show /usr/share/nginx/html
 
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]
=======
# Stage 1: Build an Angular Docker Image
FROM node:18.20-bullseye AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install --force
COPY . /app
ARG configuration=production
RUN npm run build -- --configuration $configuration
 
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/book-my-show/browser  /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
 
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
