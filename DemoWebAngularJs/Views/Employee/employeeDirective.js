define(['app_routes'], function (app) {

    app.directive('paging', function () {
        return {
             scope: true,  // use a child scope that inherits from parent
            //scope: {
            //    message: 'message'
            //},
            restrict: 'E',
            replace: true,
            transclude: true,
            // template: '<h3>Hello World!!</h3>'
            templateUrl: './Views/Employee/_Pagination.html'
        };
    });

});