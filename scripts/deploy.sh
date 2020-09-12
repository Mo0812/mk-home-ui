#! /bin/bash
yarn install
yarn build
sudo rsync -av --update dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
