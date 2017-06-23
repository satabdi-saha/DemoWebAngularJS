
require.config({
    baseUrl: "/Scripts/",

    // alias libraries paths.  Must set 'angular'
    paths: {
        'angular': '/Scripts/angular/angular-1.4.7.min',
        'angular-route': '/Scripts/angular/angular-1.4.7.route',
        'angularAMD': '/Scripts/angular/angularAMD-0.2.0.min',
        'employee-controller': '/Views/Employee/employeeController',
        'employee-service': '/Views/Employee/employeeService'
    },

    waitSeconds: 60,

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },

    // kick start application
    deps: ['app_routes']

});
