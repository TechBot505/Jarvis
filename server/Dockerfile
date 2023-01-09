FROM node:18-slim
WORKDIR /app

COPY package*.json ./
RUN npm update
RUN npm ci --only=production
COPY . ./

EXPOSE 5000

CMD ["npm", "start"]