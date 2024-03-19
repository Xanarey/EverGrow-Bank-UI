# Build stage
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Копируем наш файл конфигурации в контейнер
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENV PORT 80
CMD ["nginx", "-g", "daemon off;"]