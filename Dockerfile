FROM node:19-alpine

ENV PORT=80
ENV TRAEFIK_API=

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["node", "build"]