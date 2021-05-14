FROM node:10-alpine

LABEL Maintainer="Grebennikov Eugene"
LABEL Name="TornadoSST Ref Server"
LABEL Email="djonnyx@gmail.com"
VOLUME /app/assets
VOLUME /app/backups
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm install
COPY . .
RUN npm run compile
EXPOSE 8080
CMD [ "npm", "start" ]