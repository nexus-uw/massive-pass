FROM node:14-alpine as build
WORKDIR /build
COPY package*.json /build/

#install exactly whats in package-lock.json
RUN npm ci

COPY . /build
RUN npm run build

FROM ghcr.io/nexus-uw/darkhttpd:master
EXPOSE 80
COPY --from=BUILD /build/public /var/www/htdocs
