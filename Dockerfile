# --------------------------- Debugging Environment -------------------------- #
FROM node:18-alpine3.15 as debug
WORKDIR /notification
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g nodemon
COPY . ./
CMD npm start