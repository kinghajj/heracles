'use strict';

var services = angular.module('heracles.services', []);

services.factory('socket', function($rootScope) {
  var io_socket = io.connect('http://127.0.0.1:1337');
  var socket = {
    connected: false, connecting: false, reconnecting: false,
    disconnects: 0, reconnects: 0, failures: 0, errors: [],
    recon_failures: 0
  };

  socket.on = function(eventName, callback) {
    io_socket.on(eventName, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        callback.apply(socket, args);
      });
    });
  };

  socket.emit = function(eventName, data, callback) {
    io_socket.emit(eventName, data, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        if(callback) {
          callback.apply(socket, args);
        }
      });
    });
  };

  socket.on('connect', function() {
    socket.connected = true;
    socket.connecting = false;
    socket.reconnecting = false;
    if(socket.reconnecting) {
      socket.reconnects++;
      socket.reconnecting = false;
    }
  });

  socket.on('connecting', function() {
    socket.connecting = true;
    socket.connected = false;
  });

  socket.on('reconnecting', function() {
    socket.reconnecting = true;
  });

  socket.on('disconnect', function() {
    socket.connected = false;
    socket.connecting = false;
    socket.disconnects++;
  });

  socket.on('connect_failed', function() {
    socket.failures++;
  });

  socket.on('error', function(err) {
    socket.errors.push(err);
  });

  socket.on('reconnect_failed', function() {
    socket.recon_failures++;
  });

  return socket;
});

services.factory('user', function($rootScope, socket) {
  var user = { login_failed: false };

  socket.on('session-key', function(res) {
    if(res.okay) {
      user.login_failed = false;
      user.session_key = res.session_key;
    } else {
      user.login_failed = true;
      user.session_key = undefined;
    }
  });

  user.login = function(info) {
    socket.emit('login', info);
  };

  return user;
});

services.factory('user_socket', function($rootScope, socket, user) {
  return {
    emit: function(eventName, data, callback) {
      data.session_key = user.session_key;
      socket.emit(eventName, data, callback);
    }
  };
});
