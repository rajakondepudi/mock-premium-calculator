FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package-lock.json ./
COPY ./src ./src
COPY ./configs ./configs
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./

Run npm install -g @nestjs/cli
RUN npm ci --only=production

RUN npm run build

EXPOSE 3000
CMD [ "node", "main" ]
