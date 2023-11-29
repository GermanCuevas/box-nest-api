FROM node:18-alpine

WORKDIR /api

COPY package.json /api/

RUN ["npm", "install"]

COPY . /api/

RUN ["npm", "run", "build"]

EXPOSE 3001

CMD ["npm", "start"]

