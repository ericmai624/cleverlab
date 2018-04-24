# Cleverlab

*(Work in progress!)*

API gateway for Ulingo.ai using [Next.js](https://github.com/zeit/next.js) React server-side rendering and [Graphql](https://github.com/apollographql/apollo-server). Data are managed and fetched by microservices.



## Prerequisites

- Install [Node](https://nodejs.org/en/) (Recommend 9.11.x)
- Install [Redis](https://redis.io/download) (Recommend using Home-brew)
- (Optional) Install [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) (Recommend 1.6)



## Getting Started

- Install dependencies

  `npm install` or `yarn install`

- Start Redis

  - With Home-brew:

    `brew services start redis` to start **Redis**

  - Without Home-brew:

    Run `redis-server` to start **Redis**

- Setup config files in the **config** folder

- Build and run the project

  `npm run build` or `yarn build`

  `npm start` or `yarn start`

- Navigate to [http://localhost:8080](http://localhost:8080/) or <http://localhost:8080/graphiql>



## Project Structure

The full folder structure of this app is explained below:

| Name               | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| **.next**          | Contains the distributable (or output) from your Next.js build. This is the code you ship |
| **node_modules**   | Contains all your npm dependencies                           |
| **api**            | Contains your source code that will be compiled to the .next dir. This is the place to handle requests and fetch data from microservices |
| **api/graphql**    | Graphql schema, type definitions, and resolvers              |
| **api/io**         | Contains logics to handle events and register listeners or emit events |
| **api/middleware** | Contains middleware to process/transform incoming requests before they hit endpoints |
| **api/utils**      | Utility helper functions. These should be pure functions with no side effects |
| **config**         | Configurations between environments                          |
| **components**     | Contains your React components to be used in pages           |
| **lib**            | Contains methods for Apollo-graphql to initialize Apollo client, redirect page request, or fetch initial data for server-side rendered React |
| **pages**          | Contains all pages to be rendered by Next.js. The file name is the endpoit. |
| **static**         | Static files to be served                                    |



## Configuring compilation

Next.js uses the file `next.config.js` to adjust project compile options. See [Next.js custom-configuration](https://github.com/zeit/next.js/#custom-configuration) for detail.



