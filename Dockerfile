FROM node:14-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache libc6-compat
RUN npm install

FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN npm run build

FROM node:14-alpine AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000

ENV PORT 3000


CMD ["npm", "start"]