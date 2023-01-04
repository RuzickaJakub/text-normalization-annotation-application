FROM node:16-alpine 

EXPOSE 3333

WORKDIR /app/client

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "start"]