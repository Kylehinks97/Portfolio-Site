FROM php:8.4-cli-alpine

WORKDIR /var/www

RUN apk add --no-cache icu-libs libzip postgresql-libs \
  && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS icu-dev libzip-dev postgresql-dev \
  && docker-php-ext-install -j"$(nproc)" intl pdo_pgsql zip opcache \
  && apk del .build-deps

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

COPY composer.json composer.lock symfony.lock ./
RUN composer install \
  --no-dev \
  --no-scripts \
  --no-interaction \
  --prefer-dist \
  --optimize-autoloader

COPY . .
RUN composer dump-autoload --no-dev --optimize \
  && chmod +x bin/render-start.sh

ENV APP_ENV=prod
ENV APP_DEBUG=0

CMD ["./bin/render-start.sh"]
