FROM node:lts-alpine

WORKDIR /app
COPY package.json .

RUN yarn install
COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]