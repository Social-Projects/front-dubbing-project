FROM node:8-alpine as builder
WORKDIR /usr/src/app
COPY . .
RUN npm install --production
RUN npm run build

FROM node:8-alpine
ENV NODE_ENV production
WORKDIR /app
RUN npm install express cors
COPY --from=builder /usr/src/app/build ./build
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]