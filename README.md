# WOOF Client
## A terminal-based WOOF client built with Node.js

### Environment

Environment variables required for development are defined using [direnv](http://direnv.net/).

To see what variables you might want to set, use:

```
cat .envrc.example
```

To start using the default values:

```
cp .envrc.example .envrc
direnv allow
```

### Running the app

You can run the application in development mode using:

```
npm start
```

> When `NODE_ENV` is set to `"development"` (see [Environment](#environment)) the application will be run directly from the `src` directory using on-the-fly transpilation with Babel. This is slower but saves the step of building the application before each run.

### Building the app

This application is written in ES6/7 and should be transpiled using [Babel](https://babeljs.io/) before release. To build the `src` directory to `dist`, use:

```
npm run build
```

### Running the tests

The app is tested using [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/). All tests should be passing before the application is released. To run the tests, use:

```
npm run test
```

### Code quality

The code in this application is linted (audited) using [ESLint](http://eslint.org/) with the [AirBnb config](https://www.npmjs.com/package/eslint-config-airbnb). All code should be passing the linter before the applicaiton is released. To run ESLint, use:

```
npm run lint
```
