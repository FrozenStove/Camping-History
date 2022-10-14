# FROM node:16.3
# # Adding build tools to make yarn install work on Apple silicon / arm64 machines
# # RUN apk add --no-cache python2 g++ make
# WORKDIR /app
# # COPY ["package.json", "package-lock.json*", "./"]
# # COPY package.json /app
# # COPY package.json /app
# COPY . /app
# RUN npm install
# RUN npm run build

# --------------------------------------------------- #
FROM node:16.13
WORKDIR /usr/src/app
# first argument is from, second argument is to
COPY . /usr/src/app
RUN npm install
RUN npm run build
EXPOSE 3000

# RUN ls
# RUN cd server
# RUN ls
# RUN cd model
# RUN ls

# CMD ls

ENTRYPOINT ["node", "server/server.js"]
# CMD ["npm", "run", "list"]
# CMD []