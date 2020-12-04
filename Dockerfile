# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VUE_APP_GRAPHQL_HTTP='https://18.233.87.39:2000'
RUN npm run build:prod

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD sed -i -e "s/{{ API_URL }}/$API_URL/g" /usr/share/nginx/html/js/app.*.js && nginx -g "daemon off;"
