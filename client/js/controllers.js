'use strict';

heracles.controller('SocketCtrl', function($scope, $location, socket) {
  $scope.socket = socket;
  socket.on('connect', function() {
    $location.path('/home');
  });
});

heracles.controller('HomeCtrl', function($scope, $location, socket) {
  socket.on('disconnect', function() {
    $location.path('/');
  });
});

heracles.controller('LoginCtrl', function($scope, user) {
  $scope.user = user;
});
