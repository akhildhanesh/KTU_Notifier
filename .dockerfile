FROM node:21-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
CMD [ "node", "app" ]