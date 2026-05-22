FROM node:22.17.1
WORKDIR /app
ENV NODE_ENV dev
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE ${PORT}
CMD ["npm", "run", "dev"]