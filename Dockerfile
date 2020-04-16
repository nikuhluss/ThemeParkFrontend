FROM node:alpine
ARG BACKEND_HOST
ARG PREST_HOST
WORKDIR /app
COPY ./ /app
RUN npm install
RUN npm run build
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

