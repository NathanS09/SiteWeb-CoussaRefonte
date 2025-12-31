FROM node:18-alpine as build
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY fccoussahers/package.json fccoussahers/package-lock.json ./
RUN npm install

COPY fccoussahers/ .
RUN npm run build

FROM nginx:alpine

COPY fccoussahers/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
