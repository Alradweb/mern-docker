FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
COPY ./app.js /usr/src/app/app.js

RUN npm i --production
RUN apk add curl

EXPOSE 4000

CMD ["node", "app.js"]