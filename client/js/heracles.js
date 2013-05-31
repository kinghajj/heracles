'use strict';

var heracles = angular.module('heracles', []).
  config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);

heracles.config(function($routeProvider) {
  $routeProvider.
  when('/', {
    controller: 'SocketCtrl',
    templateUrl: 'partials/connecting.html'
  }).
  when('/home', {
    controller: 'HomeCtrl',
    templateUrl: 'partials/home.html'
  }).
  otherwise({
    redirectTo: '/'
  });
});
