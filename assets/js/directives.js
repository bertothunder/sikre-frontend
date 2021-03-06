angular.module('sikre.directives', [])
  .directive("serviceList", function($timeout){
    return {
      restrict: 'A',
      template: "<ng-include src='getTemplateUrl()'/>",
      replace: true,
      controllerAs: 'services',
      controller: function($http, $scope) {

        $scope.getService = function(serviceId) {
          $http.get(mainAPIUrl + 'services/' + serviceId)
          .success(function(data, status, headers, config) {
              $scope.services = data;
              $scope.locked = false;
              $timeout(function () {
                $scope.locked = true;
                $.notify("View time expired. Locking...", "info");
                $scope.getTemplateUrl();
              }, serviceTimeout);
          })
          .error(function(data, status, headers, config) {
              $.notify("Couldn't get the service data", "error");
          });
        };

        $scope.getTemplateUrl = function() {
          if ($scope.locked) {
            return '';
          } else {
            return 'includes/services.html';
          }
        };
      },
    };
  })

  .directive("itemList", function($timeout){
    return {
      restrict: 'A',
      template: "<ng-include src='getTemplateUrl()'/>",
      replace: true,
      controllerAs: 'items',
      controller: function($http, $scope) {

        $scope.getItems = function(serviceId) {
          $http.get(mainAPIUrl + 'items/' + groupId)
          .success(function(data, status, headers, config) {
              $scope.services = data;
              $scope.locked = false;
              $timeout(function () {
                $scope.locked = true;
                $scope.getTemplateUrl();
              }, serviceTimeout);
          })
          .error(function(data, status, headers, config) {
              $.notify("Couldn't get the service data", "error");
          });
        };

        $scope.getTemplateUrl = function() {
          if ($scope.locked) {
            return '';
          } else {
            return 'includes/services.html';
          }
        };
      },
    };
});
