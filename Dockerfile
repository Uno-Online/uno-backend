FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache yarn && yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
