FROM node:20-alpine AS basebuilder
LABEL maintainer="viniciuslag@gmail.com"
WORKDIR /app

COPY apps/web/package.json ./apps/web/
COPY package.json ./

RUN npm install --workspace=apps/web

COPY apps/web/ ./apps/web/

WORKDIR /app/apps/web
RUN npm run build

FROM node:20-alpine AS baserunner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=basebuilder /app/apps/web/.next/standalone ./
COPY --from=basebuilder /app/apps/web/public ./apps/web/public
COPY --from=basebuilder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000
CMD ["node", "apps/web/server.js"]