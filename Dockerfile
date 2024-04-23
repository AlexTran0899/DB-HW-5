FROM node:20.12.2

COPY . .

RUN npm install

ENTRYPOINT npm start