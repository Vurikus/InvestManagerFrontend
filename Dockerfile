# Step 1: Build angular application
FROM node:12-alpine AS base
WORKDIR /app
RUN npm config set unsafe-perm true
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
LABEL version="1.0"
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=base /app/dist/artslabDemo/ .
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
