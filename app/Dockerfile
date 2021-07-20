FROM node:fermium-alpine as dev
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

RUN npm install glob rimraf

COPY . .

RUN npm run build

FROM node:fermium-alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

