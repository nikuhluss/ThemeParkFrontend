FROM node:alpine
WORKDIR /app
COPY ./ /app
RUN npm run build
CMD ["npm", "run", "start"]

