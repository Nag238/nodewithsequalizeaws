FROM node:18
ENV PORT 4200
EXPOSE 4200
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
CMD ["node", "/usr/src/app/server.js"]