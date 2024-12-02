# builder stage
FROM node:22.11-alpine3.19 AS builder

ENV NODE_ENV=build

# USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm install

# COPY --chown=node:node . .
COPY . .
RUN npm run build \
    && npm prune --omit=dev

# production stage
FROM node:22.11-alpine3.19 AS production

ENV NODE_ENV=production

# USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/.env ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 4000

CMD ["node", "dist/main.js"]