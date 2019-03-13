FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY server.js ./

COPY . .

RUN npm install

EXPOSE 8080

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run start:docker