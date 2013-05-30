# heracles - a realtime textual war game

## About

## Design

The site will use AngularJS and Socket.IO to implement a realtime experience.
The client files are served by a static HTTP server, while the core application
logic is implemented by a separate Socket.IO server.

## Development

### Starting and Stopping

Start the web and application servers:

```npm start```

Stop the web and application servers:

```npm stop```

### Directory Structure

    heracles/            -- project root
      client/            -- static client files
        css/             -- stylesheets
        js/              -- JavaScript files
        partials/        -- AngularJS partials
        index.html       -- the main page
      common/            -- common node.js modules
        cluster.js       -- common clustered processing handler
      scripts/           -- utility scripts for development or production
        devel-start.sh   -- start app and web servers; mapped to `npm start'
        devel-stop.sh    -- stop app and web servers; mapped to `npm stop'
      server/            -- the application server
        config.js        -- application server configuration file
        server.js        -- application server entry file
      tmp/               -- tmp folder to be used by scripts
      web/               -- the web server
        config.js        -- web server configuration file
        mime.js          -- web server MIME type configuration file
        web.js           -- web server entry file
      LICENSE.txt        -- license file
      README.md          -- this file
      package.json       -- npm package file
