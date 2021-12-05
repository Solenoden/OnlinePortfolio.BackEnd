ARG node_version
ARG environment

FROM node:$node_version as builder
ENV NODE_ENV = $environment
WORKDIR /app
COPY package.json .
RUN npm install -g typescript
RUN npm install
COPY . .
RUN npm run build

FROM node:$node_version
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY --from=builder /app/dist .
CMD ["node", "app.js"]
