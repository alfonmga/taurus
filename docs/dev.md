Development
===========

Install dependencies
--------------------

```sh
  yarn install
```

Environment variables
---------------------

`api` package requires some environment variables (for the demo):

```sh
  touch packages/api/.env.development # create env file
  echo "GITHUB_CLIENT_SECRET=<oauth_github_client_secret>" > packages/api/.env.development # dev github oauth app client secret
```

NPM Scripts
-----------

At the root dir you can run this commands:

* `storybook`: launch Storybook
* `dev:api`: start `api` development server
* `dev:client`: start `client` development server
* `watch:shared`: recompile `shared` package on changes
* `generate:client`: auto-generate GraphQL components
* `lint`: lint all packages
* `test:api`: run api tests
* `build:shared`: compile `shared` package
* `build:api`: compile `api` package
* `build:client`: compile `client` package

`yarn <command>`

Shell Scripts
-----------

* [deploy-api.sh](../scripts/deploy-api.sh): deploy API
* [rollback-api.sh](../scripts/deploy-api.sh): rollback latest API deployment
