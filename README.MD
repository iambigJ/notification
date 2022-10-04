# Notification Service

## Requirements:
  - you need to have `docker` & `docker-compose` installed on your server or system.
   
## In order to run project, do below steps:
  - fill out `.env` as shown in `.example.env` file.
  - run `docker-compse up --build`.
  - go to your browser and check `http://localhost:3050/api/`.

  ---
Note: 
1. generate vapid key and set `private` and `public` key in app
2. set `private` and `public` key in .env file and set `public` key in ./client/registerService.js
in line 1 ( `publicVapidKey` )
3. if you cloned service you should delete pakage-lock.json and node_modules( if exist ) then folow below codes .

```bash
1. npm install
2. docker-compose up --build
```
