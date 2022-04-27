FROM node:current
LABEL maintainer "ZMiguel Valdiviesso <jose@valdiviesso.com>"

WORKDIR /opt/matrix
COPY / .

RUN npm install -g pm2
RUN npm install

EXPOSE 3000

CMD ["pm2-runtime", "process.yml"]