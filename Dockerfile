# --------------------------- Debugging Environment -------------------------- #
FROM node:18-alpine3.15 as debug
WORKDIR /education/BackEnd
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g nodemon
COPY . ./
CMD npm start
# ENTRYPOINT nodemon --inspect=0.0.0.0 ./bin/www

# -------------------------- Production Environment -------------------------- #
# FROM node:18-alpine3.15 as prod
# WORKDIR /education/BackEnd
# COPY package*.json ./
# RUN npm install
# COPY . ./
# CMD npx sequelize-cli db:create; npx sequelize-cli db:migrate; npx sequelize-cli db:seed:all; npm start