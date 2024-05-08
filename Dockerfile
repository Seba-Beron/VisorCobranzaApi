FROM node:20.13.0-alpine3.19

RUN addgroup docker && adduser -S -G docker docker

USER docker

WORKDIR /app/

COPY --chown=docker package*.json .

RUN npm install

COPY --chown=docker . .

EXPOSE 3000

CMD ["npm","start"]