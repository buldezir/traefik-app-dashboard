FROM node:19-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# ---------------

FROM node:19-alpine

ENV PORT=80
ENV SHOW_HTTP=0
ENV TRAEFIK_API=

WORKDIR /app

COPY --from=build /app/package*.json .

RUN npm ci --production --ignore-scripts

COPY --from=build /app/build .

EXPOSE ${PORT}

CMD ["node", "./index.js"]