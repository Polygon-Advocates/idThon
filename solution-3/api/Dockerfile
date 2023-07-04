# Build image
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN yarn install --frozen-lockfile

# Production image
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./
RUN yarn install --frozen-lockfile --prod

COPY --chown=node:node --from=builder /app/src /app/src

# Run the web service on container startup.
USER node
EXPOSE 8080

CMD [ "yarn", "start" ]
