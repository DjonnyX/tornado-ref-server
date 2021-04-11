FROM node:10-alpine

LABEL Maintainer="Grebennikov Eugene"
LABEL Name="TornadoSST Ref Server"
LABEL Email="djonnyx@gmail.com"
WORKDIR /app
COPY package.json .npmrc ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]