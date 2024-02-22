# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1

RUN mkdir -p /usr/src/app
RUN chmod +rwx /usr/src/app
WORKDIR /usr/src/app

# COPY Project
COPY . .

# Temp solution for bun
RUN bun install --ignore-scripts

# run the app
EXPOSE 3000
CMD ["bun", "run", "turbo", "run", "start", "--filter=backend"]