FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

CMD  ["npm", "test"]

EXPOSE 3016
