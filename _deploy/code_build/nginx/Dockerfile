FROM nginx:1.25.2

# Install packages
RUN apt-get update -qq && \
    apt-get install -y vim curl openssl

ARG app_env
ARG deploy_root
ENV APP_ENV ${app_env}
COPY ${deploy_root}/nginx/settings/${APP_ENV}/webapp.conf /etc/nginx/conf.d/webapp.conf

CMD ["/usr/sbin/nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

STOPSIGNAL SIGQUIT
EXPOSE 80
