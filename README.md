# Buchhaltungsgrogramm
Hausarbeit für BWL 1

## Initial Setup
```bash
docker-compose build
docker-compose up -d
```
Container should now be started. Next, connect to php container and execute
```bash
docker exec -it bwl_buchhaltungsprogramm_php_1 bash # connect to container
composer dump-env prod
bin/console 
bin/console doctrine:database:create
bin/console doctrine:schema:create
bin/console doctrine:fixtures:load --env=dev
```

## Develop
If you are working on the frontend, it is a good idea to use npm locally.
To do that, enter frontent folder and execute
```bash
npm install
npm start
```

If you are working on the backend, you just need to edit the files.
The php container will mount the app folder