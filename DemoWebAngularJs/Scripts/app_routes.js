
define(['angularAMD', 'angular-route'], function (angularAMD) {
        
    var app = angular.module('myApp', ['ngRoute']);

    app.factory('SiteBaseUrl', function () {
        return {
            value: 'http://localhost:63452/'
        };
    });

    app.config(function ($locationProvider, $routeProvider) {
        
        $routeProvider
       .when('/EmployeeList', angularAMD.route({

           //Routing for show list of employee
           templateUrl: './Views/Employee/_EmployeeList.html',
           controller: 'EmployeeController',
           controllerUrl: 'employee-controller',
           //caseInsensitiveMatch: true

       }))
       .when('/AddEmployee', angularAMD.route({

           //Routing for add employee
           templateUrl: './Views/Employee/_AddEmployee.html',
           controller: 'EmployeeController',
           controllerUrl: 'employee-controller'

       }))
        .when('/EditEmployee/:empId', angularAMD.route({

            //Routing for geting single employee details
            templateUrl: './Views/Employee/_EditEmployee.html',
            controller: 'EmployeeController',
            controllerUrl: 'employee-controller'

        }))
        .when('/DeleteEmployee/:empId', angularAMD.route({

            //Routing for delete employee
            templateUrl: './Views/Employee/_DeleteEmployee.html',
            controller: 'EmployeeController',
            controllerUrl: 'employee-controller'

        }))
        .when('/DepartmentList', angularAMD.route({

            templateUrl: './Views/Department/_DepartmentList.html',
            controller: 'DepartmentController',
            controllerUrl: 'department-controller'
        }))
         .when('/Calculator', angularAMD.route({

             templateUrl: './Views/Calculator/_Calculator.html',
             controller: 'CalculatorController',
             controllerUrl: 'calculator-controller'
         }))
        .otherwise({ //Default Routing  
            redirectTo: "/EmployeeList",
            //controller: 'EmployeeController'
        })

        $locationProvider.html5Mode(true);

    });

    return angularAMD.bootstrap(app);
});

