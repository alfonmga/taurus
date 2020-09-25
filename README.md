Taurus
======

> If I have seen further it is by standing on the shoulders of Giants. - Isaac Newton (1675)

The definitive modern stack to build your web projects 🛠

* `Client` powered by Next.js + Apollo GraphQL Client + Formik..etc
* `API` powered by NestJS + TypeORM (PostgreSQL) + Apollo GraphQL Server + Passport.js..etc
* Shared code between client-side and server-side ([DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)!)
* Strongly-typed (thanks to TypeScript, @nestjs/typeorm, @nestjs/graphql and GraphQL Code Generator)
* Tooling ready (TSConfig, ESLint and Prettier)
* Storybook
* Easy deployment

*`Taurus` is just a personal proof-of-concept that you can use or get inspired by. I have been building web applications using a similar architecture/technologies for a few years but I never was satisfied with the chosen stack. After blood, sweat, and tears I believe found with `Taurus` the perfect stack to build on my future side projects.*

<a href="https://www.buymeacoffee.com/alfon" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

Live Demo ([screenshot](docs/images/demo-screenshot.png))
----

[https://taurus-client.alfon.io](https://taurus-client.alfon.io)

Packages
--------

* [Shared](packages/shared)
* [API](packages/api)
* [Client](packages/client)

Documentation
-------------

* [Development](docs/dev.md)
* [Dokku](docs/dokku.md)
* [Vercel](docs/vercel.md)

TODOs
-----

* [x] Next.js client-side app
  * [x] NextSEO
  * [x] Material UI
  * [x] Easy Peasy
  * [x] Apollo GraphQL client
  * [x] GraphQL Code Generator
  * [x] Formik
  * [x] Yup
* [x] NestJS server-side app
  * [x] Apollo GraphQL server
  * [x] TypeORM
    * [x] PostgreSQL
  * [x] PassportJS
    * [x] GitHub OAuth
  * [x] Health check
  * [x] Yup
  * [x] DataLoader (solves N+1 GraphQL problem)
* [x] Code sharing
  * [x] Constants
  * [x] Interfaces
  * [x] Material UI Theme
  * [x] Yup validation
* [x] Storybook
* [x] ESLint
* [x] Prettier
* [x] `.editorconfig`
* [x] Deploy client to Vercel
* [x] Containerize API
* [x] Demo application
* [x] Deploy API to a Dokku server
