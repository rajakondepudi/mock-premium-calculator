FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm install ts-node --save-dev

# Bundle app source
# Bundle app source


EXPOSE 3000
CMD [ "ts-node", "main.ts" ]
