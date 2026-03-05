#
# Single multi-stage Dockerfile with multiple build targets:
# - target "node": Next.js runtime
# - target "php":  Symfony (PHP-FPM) runtime
# - target "nginx": reverse proxy
#
# Usage (via compose.yaml):
#   docker compose build frontend api nginx
#

ARG NODE_VERSION=20-alpine
ARG PHP_VERSION=8.4-fpm-alpine
ARG NGINX_VERSION=1.27-alpine

# -----------------------------
# Next.js (Node) stages
# -----------------------------
FROM node:${NODE_VERSION} AS node-deps
WORKDIR /app/frontend

COPY frontend/package.json frontend/bun.lock ./
RUN npm install

FROM node-deps AS node-builder
WORKDIR /app/frontend
COPY frontend/ ./
RUN npm run build \
  && npm prune --omit=dev

FROM node:${NODE_VERSION} AS node
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
WORKDIR /app/frontend

COPY --from=node-builder /app/frontend/package.json ./package.json
COPY --from=node-builder /app/frontend/node_modules ./node_modules
COPY --from=node-builder /app/frontend/.next ./.next
COPY --from=node-builder /app/frontend/public ./public
COPY --from=node-builder /app/frontend/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["npm", "run", "start"]

# -----------------------------
# Symfony API (PHP-FPM) stages
# -----------------------------
FROM php:${PHP_VERSION} AS php-base
WORKDIR /var/www

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/tmp/composer

RUN apk add --no-cache \
      icu-libs \
      libzip \
      postgresql-libs \
    && apk add --no-cache --virtual .build-deps \
      $PHPIZE_DEPS \
      icu-dev \
      libzip-dev \
      postgresql-dev \
    && docker-php-ext-install -j"$(nproc)" \
      intl \
      opcache \
      pdo_pgsql \
      zip \
    && { \
      echo "opcache.enable=1"; \
      echo "opcache.enable_cli=0"; \
      echo "opcache.validate_timestamps=0"; \
      echo "opcache.memory_consumption=128"; \
      echo "opcache.interned_strings_buffer=16"; \
      echo "opcache.max_accelerated_files=20000"; \
    } > /usr/local/etc/php/conf.d/opcache-recommended.ini \
    && apk del .build-deps

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

FROM php-base AS php-vendor
WORKDIR /var/www

COPY api/composer.json api/composer.lock api/symfony.lock ./
RUN composer install \
      --no-dev \
      --no-scripts \
      --prefer-dist \
      --no-interaction \
      --no-progress \
      --optimize-autoloader

FROM php-base AS php
WORKDIR /var/www

ENV APP_ENV=prod \
    APP_DEBUG=0

COPY --from=php-vendor /var/www/vendor ./vendor
COPY api/ ./
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var

EXPOSE 9000
CMD ["php-fpm", "-F"]

# -----------------------------
# Nginx reverse proxy stage
# -----------------------------
FROM nginx:${NGINX_VERSION} AS nginx
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
