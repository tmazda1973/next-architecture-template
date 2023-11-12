FROM node:18.4.0 as node

# Set Environment variable
ENV LANG C.UTF-8 && \
    TZ='Asia/Tokyo'

# Execute commands
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends && \
    apt-get -y install imagemagick build-essential libpq-dev libfontconfig1 vim npm openssl && \
    apt install -y \
        g++ \
        libicu-dev \
        libpq-dev \
        libzip-dev \
        zip \
        zlib1g-dev \
        wget && \
    rm -rf /var/lib/apt/lists/*

# Install Entrykit
ENV ENTRYKIT_VERSION 0.4.0
RUN wget https://github.com/progrium/entrykit/releases/download/v${ENTRYKIT_VERSION}/entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && tar -xvzf entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && rm entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && mv entrykit /bin/entrykit \
  && chmod +x /bin/entrykit \
  && entrykit --symlink

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

# Set environment variables
ENV APP_ENV local

# Copy setting files
COPY ./app/settings/entrypoint.sh /tmp/entrypoint.sh
RUN chmod +x /tmp/entrypoint.sh
RUN mkdir -p /var/app
COPY ./app/settings/startup.sh /var/app/startup.sh
RUN chmod +x /var/app/startup.sh

ENTRYPOINT [ \
  "prehook", \
    "/tmp/entrypoint.sh", "--" \
]

STOPSIGNAL SIGQUIT
EXPOSE 3000
CMD ["/var/app/startup.sh"]
