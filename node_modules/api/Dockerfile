FROM node:20-alpine AS basebuilder
LABEL maintainer="viniciuslag@gmail.com"
WORKDIR /app

COPY apps/api/package.json ./apps/api/
COPY package.json ./

RUN npm install --workspace=apps/api

COPY apps/api/ ./apps/api/

WORKDIR /app/apps/api
RUN npm run build

FROM node:20-alpine AS baserunner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=basebuilder /app/apps/api/dist ./dist
COPY --from=basebuilder /app/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "dist/index.js"]