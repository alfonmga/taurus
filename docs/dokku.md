Dokku
============

We use [Dokku](https://github.com/dokku/dokku/) (Platform-as-a-Service) to manage the lifecycle of the API application.

Create a $5 Dokku Droplet on DigitalOcean
---------------------------------------

* [https://marketplace.digitalocean.com/apps/dokku](https://marketplace.digitalocean.com/apps/dokku)

On the Dokku setup page (`http://<droplet-ip-address>`) remember to check the box `Use virtualhost naming for app`.

Required installed Dokku plugins
---------------------------------

* [**postgres**](https://github.com/dokku/dokku-postgres)
<!-- * [**hostname**](https://github.com/michaelshobbs/dokku-hostname) -->
* [**letsencrypt**](https://github.com/dokku/dokku-letsencrypt)
<!-- * [**maintenance**](https://github.com/dokku/dokku-maintenance) -->

Cloudflare DNS
--------------

`Type` `Name` `Content` `TTL` `Proxy status`

`A` `@ for root or <domain> for subdomain` `<droplet-ip-address>` `2 min` `DNS only`

Configure Dokku default page
-------------------------------------------

Return `410 GONE` HTTP status code.

```sh
    touch /etc/nginx/conf.d/00-default-vhost.conf # create file
    vim /etc/nginx/conf.d/00-default-vhost.conf # edit created file
```

Copy/paste this content:

```nginx
    server {
        listen 80 default_server;
        server_name _;
        access_log off;
        return 410;
    }
```

Reload Nginx service:

```sh
    service nginx reload
```

Create the app
---------------

```sh
    dokku apps:create taurus-api
```

Create the database
-------------------

```sh
    dokku postgres:create taurus --image postgres --image-version 12.3
    dokku postgres:link taurus taurus-api
    dokku postgres:expose taurus # expose database to outside world so we can run migrations later
```

Setup domains
-------------

```sh
    dokku domains:add taurus-api <your-domain>
```

Verify app port mappings
------------------------

```sh
  dokku proxy:ports taurus-api
```

```shell
# example output
    -----> Port mappings for taurus-api
    -----> scheme  host port  container port
    http           80         80
    https          443        80
```

Let's Encrypt (SSL Certificates)
--------------------------------

```sh
    dokku config:set --global DOKKU_LETSENCRYPT_EMAIL=<your-email>

    # generate certs for the apps
    dokku letsencrypt taurus-api
```

Environment variables
---------------------

```sh
  dokku config:set taurus-api GITHUB_CLIENT_SECRET=<oauth_github_client_secret> SESSION_SECRET=<session_secret>
```

Deploy app
------------------

Execute shell script [deploy-api.sh](../scripts/deploy-api.sh) to deploy the app.

Database migrations
---------------------------

```sh
cd packages/api # navigate to api package

touch .env.ormconfig # create env file to store database secrets
echo "DATABASE_URL=postgres://postgres:<db-user-password>@<droplet-ip-address>:<database-exposed-port>/taurus" > .env.ormconfig # set DATABASE_URL (run `dokku postgres:info taurus --dsn` to get your db dsn)

db:prod:migrations:generate -n <migration_name> # generate migration
db:prod:migrations:run # run pending generated migrations (if at this current step you have an empty database then `seed` migration will run)
```

How to: Rollback a deployment
----------------------------

Execute shell script [rollback-api.sh](../scripts/rollback-api.sh) to rollback a deployment.
