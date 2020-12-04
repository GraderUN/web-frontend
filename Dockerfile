# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm ci
COPY . .

RUN npm run build:prod
RUN ./node_modules/.bin/vue-cli-service build --mode production

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD sed -i -e "s/{{ API_URL }}/$API_URL/g" nginx -g "daemon off;"
