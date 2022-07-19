# Stage 1
FROM node:16.15-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
COPY kendo-ui-license.txt /app
RUN npm install
RUN npx kendo-ui-license activate
COPY . /app
RUN npm run build-prod
# Stage 2
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/warroom-frontend-angular /usr/share/nginx/html
