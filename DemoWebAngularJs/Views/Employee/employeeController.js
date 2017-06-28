
define(['app_routes', 'employee-service'], function (app, empservice) {

    app.controller("EmployeeController", function ($scope, $http, $location, $routeParams, $filter, empservice) {

        document.title = 'Employee';

        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.ListOfEmployee = [];

        $scope.Status;

        $scope.Close = function () {
            $location.path('/EmployeeList');
        }


        $scope.searchEmployee = '';

        $scope.getData = function () {                      
            return $filter('filter')($scope.ListOfEmployee, $scope.searchEmployee);
        }


        /**************************************/

        $scope.numberOfPages = function () {           
            return Math.ceil($scope.getData().length / $scope.pageSize);
        }

        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $scope.setPage = function (page) {

            if (page >= 0 && page <= $scope.numberOfPages() - 1) {
                $scope.currentPage = page;
            }
        }

        /*******************************************/
        //Add new employee
        $scope.Add = function () {
            var employeeData = {
                EmployeeID: 0,
                FirstName: $scope.FirstName,
                LastName: $scope.LastName,
                Address: $scope.Address,
                Salary: $scope.Salary,
                DOB: $scope.DOB,
                // DepartmentID: $scope.DepartmentID
            };

            var promise = empservice.save(employeeData);
            promise.then(function (resp) {

                if (resp.status == 200 || resp.status == 201) {
                    $scope.loadEmployees();
                    $location.path('/EmployeeList');
                }
            },
            function (err) {
                $scope.error = "Error!!! " + err.status + ' :: ' + err.data.message;
            });
        }

        //Update the employee records
        $scope.Update = function () {

            var employeeData = {
                EmployeeID: $scope.Id,
                FirstName: $scope.FirstName,
                LastName: $scope.LastName,
                Address: $scope.Address,
                Salary: $scope.Salary,
                DOB: $scope.DOB
                //DepartmentID: $scope.DepartmentID
            };
            if ($scope.Id > 0) {

                var promise = empservice.save(employeeData);
                promise.then(function (resp) {

                    if (resp.status == 200 || resp.status == 204) {
                        $scope.loadEmployees();
                        $location.path('/EmployeeList');
                    }
                },
                function (err) {
                    $scope.error = "Error!!! " + err.status + ' :: ' + err.data.message;
                });

                //$http.put("api/employee/UpdateEmployee", employeeData).success(function (data) {
                //    $location.path('/EmployeeList');
                //}).error(function (data) {
                //    console.log(data);
                //    $scope.error = "Something wrong when adding updating employee " + data.ExceptionMessage;
                //});
            }
        }

        //Delete the selected employee from the list
        $scope.Delete = function () {
            if ($scope.Id > 0) {

                var promise = empservice.delete($scope.Id);
                promise.then(function (resp) {

                    if (resp.status == 200) {
                        $location.path('/EmployeeList');
                    }
                },
                function (err) {
                    $scope.error = "Error!!! " + err.status + ' :: ' + err.data.message;
                });


                //$http.delete("api/employee/DeleteEmployee/" + $scope.Id).success(function (data) {
                //    $location.path('/EmployeeList');
                //}).error(function (data) {
                //    console.log(data);
                //    $scope.error = "Something wrong when adding Deleting employee " + data.ExceptionMessage;
                //});
            }

        }


        /***********************************************/

        ////Get all employee and bind with html table
        $scope.loadEmployees = function () {
            debugger;
            var promise = empservice.get();
            promise.then(function (resp) {
                $scope.ListOfEmployee = resp.data;
                $scope.Status = "Call Completed Successfully";
            },
            function (err) {
                $scope.Status = "Error!!! " + err.status + ' :: ' + err.data.message;
            });
        };


        //Fill the employee records for update
        if ($routeParams.empId) {
            $scope.Id = $routeParams.empId;

            var promise = empservice.find($scope.Id);
            promise.then(function (resp) {

                $scope.FirstName = resp.data.firstName;
                $scope.LastName = resp.data.lastName;
                $scope.Address = resp.data.address;
                $scope.Salary = resp.data.salary;
                $scope.DOB = resp.data.dob

            },
            function (err) {
                $scope.error = "Error!!! " + err.status + ' :: ' + err.data.message;
            });
        }

        $scope.loadEmployees();

    });

    app.filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });

});