FROM node:12.18.1
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
# RUN apk add --no-cache python2 g++ make
WORKDIR /app
# COPY ["package.json", "package-lock.json*", "./"]
# COPY package.json /app
COPY package.json /app
RUN npm install

COPY . /app
CMD ["node", "server/server.js"]
# CMD ["npm", "run", "dev"]