FROM node:14-alpine as build
WORKDIR /build
COPY package*.json /build/

#install exactly whats in package-lock.json
RUN npm ci

COPY . /build
RUN npm run build

FROM nginx:alpine
COPY --from=build /build/public  /usr/share/nginx/html
