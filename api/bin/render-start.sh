#!/bin/sh

set -eu

php bin/console doctrine:migrations:migrate --no-interaction
php bin/console app:seed-projects --no-interaction

exec php -S "0.0.0.0:${PORT:-8000}" -t public public/index.php
