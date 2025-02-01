#Base image
FROM node:16

#Working directory
WORKDIR /app

#Install dependencies
COPY package.json package-lock.json ./
RUN npm install

#Copy entire project
COPY . .

#Build app for production
RUN npm run build

#Serve the app
RUN npm install -g serve
CMD ["serve", "-s", "build"]

#Exposing front end on this port
EXPOSE 3000
