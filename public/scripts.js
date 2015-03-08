angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeCtrl',
    templateUrl: 'templates/home.html'
  });

  $urlRouterProvider.otherwise('/');

})

.controller('HomeCtrl', function($scope, $http) {
  $scope.test = 1;

  $scope.taken = [];

  $scope.addTaken = function() {
    if ($scope.taken.indexOf($scope.takenName) !== -1) {
      alert('Class already added!');
    } else if (!/^[A-Z]+ [\d]{4}$/.test($scope.takenName)) {
      alert('Invalid class name!');
    } else {
      $scope.taken.push($scope.takenName);
    }
    $scope.takenName = '';
  };

  $scope.pending = [];

  $scope.addPending = function() {
    if ($scope.pending.indexOf($scope.pendingName) !== -1) {
      alert('Class already added!');
    } else if (!/^[A-Z]+ [\d]{4}$/.test($scope.pendingName)) {
      alert('Invalid class name!');
    } else {
      $scope.pending.push($scope.pendingName);
    }
    $scope.pendingName = '';
  };

  $http.get('/data/taken.json').then(function(res) {
    $scope.taken = res.data;
  });

  $http.get('/data/pending.json').then(function(res) {
    $scope.pending = res.data;
  });

  $scope.suggested = [];
  $scope.generate = function() {
    $http.post('/plan', {
      taken: $scope.taken,
      pending: $scope.pending,
      load: parseInt($scope.load) || 16
    }).then(function(res) {
      $scope.suggested = res.data;
    });
  };
});
