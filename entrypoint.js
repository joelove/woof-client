if (process.env.NODE_ENV === 'development') {
  require('babel-register');
  require('./src/run');
} else {
  require('./dist/run');
}
