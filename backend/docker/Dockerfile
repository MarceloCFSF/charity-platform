FROM php:8.3.7-fpm

RUN apt-get update && apt-get install -y \
  git unzip curl libpng-dev libonig-dev libxml2-dev zip libpq-dev \
  && docker-php-ext-configure gd \
  && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev

RUN chown -R www-data:www-data /var/www \
  && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

RUN php artisan config:cache && php artisan route:cache

CMD [ "php-fpm" ]