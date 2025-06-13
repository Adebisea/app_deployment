# build stage
FROM node:18-slim AS build

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .


# prod stage
FROM node:18-slim AS production

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./

USER node

RUN npm install --omit=dev

# Copy built app & static files from build
COPY --from=build /home/node/app ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:3000/health || exit 1

CMD [ "node", "main.js" ]