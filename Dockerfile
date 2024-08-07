FROM nginx:stable

RUN apt-get update
RUN apt-get install --no-install-recommends curl software-properties-common -y
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install --no-install-recommends nodejs -y

ADD server /server
RUN cd /server && npm install

ADD client /client
RUN cd /client && npm install && npm run build

ADD ./.docker/ecosystem.config.js /etc/nginx/ecosystem.config.js
ADD ./.docker/nginx.conf /etc/nginx/nginx.conf

RUN npm install pm2 -g

ADD ./.docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

# Run it
ENTRYPOINT ["/start.sh"]
