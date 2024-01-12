FROM node:18.4.0 as node

# Set Environment variable
ENV LANG C.UTF-8 \
    && TZ='Asia/Tokyo'

# Execute commands
RUN apt-get update -qq \
    && apt-get install -y --no-install-recommends \
    && apt-get -y install imagemagick build-essential libpq-dev libfontconfig1 vim npm openssl \
    && apt install -y \
        g++ \
        libicu-dev \
        libpq-dev \
        libzip-dev \
        zip \
        zlib1g-dev \
        wget \
    && rm -rf /var/lib/apt/lists/*

# Install yarn
ENV YARN_VERSION 1.22.19
COPY --from=node /opt/yarn-v${YARN_VERSION} /opt/yarn
COPY --from=node /usr/local/bin/node /usr/local/bin/
RUN ln -fs /opt/yarn/bin/yarn /usr/local/bin/yarn \
    && ln -fs /opt/yarn/bin/yarnpkg /usr/local/bin/yarnpkg

# Setup application home directory
ENV APP_HOME /app
RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}
ADD ./app ${APP_HOME}

# Set environment variables
ARG app_env
ARG app_build_id
ARG app_crypt_key
ARG app_crypt_iv
ENV APP_ENV ${app_env}
ENV APP_BUILD_ID ${app_build_id}
ENV APP_CRYPT_KEY ${app_crypt_key}
ENV APP_CRYPT_IV ${app_crypt_iv}

# Decrypt `.env` file
RUN sh ./_scripts/env_decrypt.sh -e ${APP_ENV} ${APP_CRYPT_KEY} ${APP_CRYPT_IV}

# Copy setting files
ARG deploy_root
COPY ${deploy_root}/app/settings/entrypoint.sh /tmp/entrypoint.sh
RUN chmod +x /tmp/entrypoint.sh
RUN mkdir -p /var/app
COPY ${deploy_root}/app/settings/startup.sh /var/app/startup.sh
RUN chmod +x /var/app/startup.sh

ENTRYPOINT ["/tmp/entrypoint.sh"]

STOPSIGNAL SIGQUIT
EXPOSE 3000
CMD ["/var/app/startup.sh"]
