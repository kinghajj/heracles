var defaultPort      = 1337,
    defaultRedisPort = 6379;

module.exports = {
  port: defaultPort,
  fork: 1,
  log:  true,
  db: {
    redii: {
      'main': {
        port: defaultRedisPort,
        host: '192.168.1.34'
      }
    },
    clients: {
      'heracles_session': ['main', 0],
      'heracles_game':    ['main', 0],
      'socket_io_pub':    ['main', 1],
      'socket_io_sub':    ['main', 1],
      'socket_io_client': ['main', 1]
    }
  },
  scripts: {
    './server/scripts': {
      'answer': 0,
      'get': 1
    }
  }
}
