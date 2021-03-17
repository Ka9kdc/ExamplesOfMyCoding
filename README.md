# This branch - Node JS version of w9ccu.org

This is an attempt at rebuilding the Wheaton Amauter Radio Club's website into a Single page application using Node.js, Express, React, Sequelize, Redux and a PostgreSQL database.

## To view

- clone down this branch
- npm install
- setup database
  - create a database called wrca
  - npm run seed
- npm run start:dev
- view at  https://localhost:1432

## Testing

There are tests written in Mocha and Chai. You can run all of them at one or just a section (express, sequelize, react, or redux) by itself.

- All tests: npm test
- Express Routes: npm run route-test
- Sequelize Models: npm run model-test
- Redux: npm run redux-test
- React: npm run react-test

