define(['app_routes'], function (app) {

    app.controller("CalculatorController", function ($scope, $http, $location, $routeParams) {
        debugger;

        $scope.Number = 0;
        $scope.RemainderValue = 0;
        $scope.CalType = 0;

        $scope.calHistry = [];

        $scope.CalProcess = '';

        $scope.Clear = function () {
            $scope.Number = 0;
            $scope.RemainderValue = 0;
            $scope.CalType = 0;
            $scope.CalProcess = '';
            $scope.calHistry = [];
        }

        $scope.NumberChange = function () {
            if ($scope.CalProcess != '') {
                $scope.CalProcess = $scope.RemainderValue + '' + $scope.Number;
            }
        }

        $scope.Multiplication = function () {
            debugger;
            if ($scope.Number > 0) {
                $scope.RemainderValue = $scope.Number;
                $scope.CalType = 1;

                //$scope.CalProcess = '= ' + $scope.Number + ' x ';

                $scope.calHistry.push($scope.Number)
                $scope.calHistry.push('x')

                $scope.CalProcess = '';
                $.each($scope.calHistry, function (index, value) {
                    
                    if ($scope.CalProcess == '') {
                        $scope.CalProcess = '= ';
                    }

                    $scope.CalProcess = $scope.CalProcess + ' ' + value;
                });

                $scope.Number = 0;
            }
        }


        /*************************************/

        $scope.Equal = function () {

            switch ($scope.CalType) {
                case 1:
                    var val = ($scope.RemainderValue * $scope.Number);
                    $scope.Number = val;
                    break;
                case n:

                    break;
                default:
                    break;
            }

        }

    });

});