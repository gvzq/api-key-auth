# api-key-auth
API key authentication to your REST endpoints. 

## To Do


- [x] Serverless
- [ ] Auth

Auth & Abstraction
- https://blog.logrocket.com/understanding-api-key-authentication-node-js/
- https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
- https://github.com/geshan/expressjs-structure/blob/master/src/controllers/programmingLanguages.controller.js


## Deploy

Replace name.

```
gcloud functions deploy built-with --gen2 --runtime=nodejs16 --region=us-central1 --source=. --entry-point=app --trigger-http --allow-unauthenticated --memory=512MB --set-env-vars API_KEY={name}-x-key
```