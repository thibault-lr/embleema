FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

# SSL certificates
COPY ./packages/webapp/nginx/localhost.crt /etc/nginx/certs/localhost.crt
COPY ./packages/webapp/nginx/localhost.key /etc/nginx/certs/localhost.key


COPY ./packages/webapp/nginx/nginx.conf /etc/nginx/conf.d/

# Copy the build output from your React app
COPY ./packages/webapp/dist /usr/share/nginx/html
