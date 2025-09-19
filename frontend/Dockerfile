FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG RECAPTCHA_SITE_KEY
RUN sed -i "s/REPLACE_WITH_RECAPTCHA_SITE_KEY/${RECAPTCHA_SITE_KEY}/g" dist/index.html && \
    sed -i "s/REPLACE_WITH_RECAPTCHA_SITE_KEY/${RECAPTCHA_SITE_KEY}/g" dist/script.js

EXPOSE 8080
