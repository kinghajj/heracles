# heracles - a realtime textual war game

## About

### Design

The site will use AngularJS and Socket.IO to implement a realtime experience.
The client files are served by a static HTTP server, while the core application
logic is implemented by a separate Socket.IO server. Decoupling the web and
application servers from the start should facilitate scaling, and the HTTP
server can be exchanged in production for another one, such as nginx.

## Development

### Starting and Stopping

Start the web and application servers:

```sh
npm start
```

Stop the web and application servers:

```sh
npm stop
```

### Directory Structure

    heracles/            -- project root
      client/            -- static client files
        css/             -- stylesheets
        js/              -- JavaScript files
          controllers.js -- AngularJS controllers
          heracles.js    -- AngularJS app module
          serices.js     -- AngularJS services/providers/factories
        partials/        -- AngularJS partials
        index.html       -- the main page
      common/            -- common node.js modules
        cluster.js       -- common clustered processing handler
      scripts/           -- utility scripts for development or production
        devel-start.sh   -- start app and web servers; mapped to `npm start'
        devel-stop.sh    -- stop app and web servers; mapped to `npm stop'
      server/            -- the application server
        scripts/         -- Redis Lua scripts
        config.js        -- configuration file
        db.js            -- database setup module
        io.js            -- socket.io setup module
        log.js           -- wrapper around 'util.log' for clustered programs
        scripts.js       -- Redis Lua script setup module
        server.js        -- program entry file
      tmp/               -- tmp folder to be used by scripts
      web/               -- the web server
        config.js        -- configuration file
        mime.js          -- MIME type configuration file
        web.js           -- program entry file
      LICENSE.txt        -- license file
      README.md          -- this file
      package.json       -- npm package file
