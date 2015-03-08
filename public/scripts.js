angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeCtrl',
    templateUrl: 'templates/home.html'
  });

  $urlRouterProvider.otherwise('/');

})

.controller('HomeCtrl', function($scope) {
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
});
