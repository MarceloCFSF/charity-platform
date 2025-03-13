FROM php:8.3.7-fpm

RUN apt-get update && apt-get install -y \
  git unzip curl libpng-dev libonig-dev libxml2-dev zip libpq-dev \
  && docker-php-ext-configure gd \
  && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

USER www-data
WORKDIR /var/www

COPY --chown=www-data:www-data . .

RUN composer install --no-dev

RUN php artisan config:cache && php artisan route:cache

CMD [ "php-fpm" ]