﻿
require.config({
    baseUrl: "Scripts/",

    // alias libraries paths.  Must set 'angular'
    paths: {
        'angular': './angular/angular-1.4.7.min',
        'angular-route': './angular/angular-1.4.7.route',
        'angularAMD': './angular/angularAMD-0.2.0.min',

        'employee-controller': '../Views/Employee/employeeController',
        'employee-service': '../Views/Employee/employeeService',

        'department-controller': '../Views/Department/departmentController',
        'calculator-controller': '../Views/Calculator/calculatorController',

        'pagination': '../Views/Employee/employeeDirective'
    },


    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },

    // kick start application
    deps: ['app_routes', 'pagination']

});
