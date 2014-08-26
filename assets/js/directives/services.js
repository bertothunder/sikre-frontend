// This directive is meant to return the tab data that was clicked

app.directive("serviceList", function(){
    return {
        restrict: 'A',
        templateUrl: 'includes/services.html',
        controllerAs: 'services',
        controller: function($http, $scope) {
            $http.get('http://localhost:8080/v1/services')
            .success(function(data, status, headers, config) {
                $scope.services = data.services;
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: Couldn't get the services list from the server.");
            });
        }
    };
});