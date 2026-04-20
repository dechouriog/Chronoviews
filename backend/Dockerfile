FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install sqlite3 --build-from-source

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]