define(['app_routes'], function (app) {

    app.controller("DepartmentController", function ($scope, $http, $location, $routeParams) {

        document.title = 'Department';

        $scope.Heading = 'Department';

    });

});