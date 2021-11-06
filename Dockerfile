ARG node_version
ARG environment

FROM node:$node_version
ENV NODE_ENV = $environment

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

ADD . /app

RUN npm run build

CMD ["node", "app.js"]
