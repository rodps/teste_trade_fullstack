FROM node:21.5.0
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm i -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]