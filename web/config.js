module.exports = {
  port: 8080,
  fork: 2, // require('os').cpus().length,
  root: require('path').join(__dirname, '..', 'client'),
  spec: {
    '/': {
      rdir: '/index.html'
    },
    '/index.htm': {
      rdir: '/index.html'
    },
    '/index': {
      rdir: '/index.html'
    },
  },
  mime: require('./mime')
};
