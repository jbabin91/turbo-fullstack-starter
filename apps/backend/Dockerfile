# syntax = docker/dockerfile:1

ARG APP_DIRNAME=backend
ARG APP_PKG_NAME=backend

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine as pruner
ARG APP_PKG_NAME
RUN apk update
RUN apk add --no-cache libc6-compat

LABEL fly_launch_runtime="NodeJS"

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=$APP_PKG_NAME --docker
RUN find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

FROM node:${NODE_VERSION}-alpine as base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN corepack enable
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

FROM base as deps
WORKDIR /app
RUN pnpm install

FROM base as runner
ARG APP_DIRNAME

ENV NODE_ENV production

COPY --from=pruner /app/out/full/ .
COPY --from=deps /app .

CMD ["pnpm", "run", "--filter", "backend", "start"]
