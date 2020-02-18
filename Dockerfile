FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# Copied separatly, to take advantage of docker caching
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

RUN npm run build:production

CMD [ "npm", "run", "start:production" ]

# to build into image
# docker build -t image_name .

# to start image and listen on port 80:
# docker run -p 80:3001 image_name
