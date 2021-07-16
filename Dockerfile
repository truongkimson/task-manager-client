FROM node:15.13-alpine as build
WORKDIR /app
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]