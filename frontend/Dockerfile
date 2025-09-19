FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG RECAPTCHA_SITE_KEY
RUN /bin/sh -c 'find dist -type f -exec sed -i "s/REPLACE_WITH_RECAPTCHA_SITE_KEY/${RECAPTCHA_SITE_KEY}/g" {} +'

EXPOSE 8080

CMD [ "npm", "start" ]
