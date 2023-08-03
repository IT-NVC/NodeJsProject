# syntax=docker/dockerfile:1

FROM node:14-alpine

WORKDIR /LearnDocker/NodeExpress

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]
