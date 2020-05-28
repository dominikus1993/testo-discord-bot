FROM node:latest AS base
WORKDIR /app

FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm set progress=false && npm config set depth 0
RUN npm install
RUN npm run build

FROM base AS final
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/lib ./

ENTRYPOINT node index.js