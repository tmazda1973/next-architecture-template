FROM nginx:1.25.2

# install vim
RUN apt-get update -qq && \
    apt-get install -y vim openssl

COPY nginx/settings/webapp.conf /etc/nginx/conf.d/webapp.conf

CMD ["/usr/sbin/nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

STOPSIGNAL SIGQUIT
EXPOSE 80
