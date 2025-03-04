FROM node:23.4.0-alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile && \ 
  yarn cache clean

COPY . .

RUN yarn build

CMD ["yarn", "start"]
