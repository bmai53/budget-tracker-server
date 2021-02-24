FROM node:latest

# Create app directory
WORKDIR server

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]