FROM node:9
WORKDIR /tmp
COPY package.json /tmp
RUN npm install -g yarn
RUN yarn install

