FROM node:16-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

COPY server/ ./server/

EXPOSE 3000

CMD ["node", "server/src/server.js"]
