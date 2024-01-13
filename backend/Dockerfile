FROM node:21.5.0
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY prisma .
RUN npx prisma generate
COPY src types tsconfig.json ./
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]