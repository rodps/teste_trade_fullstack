FROM node:21.5.0
ENV REACT_APP_GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG GITHUB_CLIENT_ID
ENV REACT_APP_GITHUB_CLIENT_ID $GITHUB_CLIENT_ID
RUN npm run build
RUN npm i -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]