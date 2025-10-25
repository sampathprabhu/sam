// Define AngularJS module and routing
var app = angular.module("userApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/dashboard.html",
      controller: "DashboardController"
    })
    .when("/view/:id", {
      templateUrl: "views/viewProfile.html",
      controller: "ViewController"
    })
    .when("/edit/:id", {
      templateUrl: "views/editProfile.html",
      controller: "EditController"
    })
    .otherwise({
      redirectTo: "/"
    });
});

// Service to fetch data
app.service("UserService", function($http) {
  this.getUsers = function() {
    return $http.get("users.json");
  };
});

// Dashboard controller
app.controller("DashboardController", function($scope, UserService) {
  UserService.getUsers().then(function(response) {
    $scope.users = response.data;
  });
});

// View Profile controller
app.controller("ViewController", function($scope, $routeParams, UserService) {
  UserService.getUsers().then(function(response) {
    $scope.user = response.data.find(u => u.id == $routeParams.id);
  });
});

// Edit Profile controller
app.controller("EditController", function($scope, $routeParams, UserService) {
  UserService.getUsers().then(function(response) {
    $scope.user = angular.copy(response.data.find(u => u.id == $routeParams.id));
  });

  $scope.saveChanges = function() {
    alert("Profile updated for " + $scope.user.name);
  };
});
