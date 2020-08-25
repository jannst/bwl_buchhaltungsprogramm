FROM nginx:1.19.2-alpine
RUN apk add --update nodejs nodejs-npm

COPY ./frontend /tmp/app
RUN cd /tmp/app && npm run build && cp -r build /var/www && rm -rf /tmp/app
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]