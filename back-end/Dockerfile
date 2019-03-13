FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY server.js ./

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start:docker"]