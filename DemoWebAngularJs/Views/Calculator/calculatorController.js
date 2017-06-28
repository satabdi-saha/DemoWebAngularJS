define(['app_routes'], function (app) {

    app.controller("CalculatorController", function ($scope, $http, $location, $routeParams) {
        
        document.title = 'Calculator';

        $scope.Header = 'Calculator';

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
            $scope.CalProcess = '';
            $.each($scope.calHistry, function (index, value) {
                if ($scope.CalProcess == '') {
                    $scope.CalProcess = '= ';
                }
                $scope.CalProcess = $scope.CalProcess + value + $scope.Symbole() + $scope.Number;
            });
        }

        $scope.Multiplication = function () {

            $scope.CalType = 1;

            if ($scope.RemainderValue == 0 && $scope.Number > 0) {
                $scope.RemainderValue = $scope.Number;
                
                
                $scope.calHistry = [];
                if ($scope.calHistry.length > 0) {
                    $scope.calHistry.push('x')
                }

                $scope.calHistry.push($scope.Number)


                $scope.CalProcess = '';
                $.each($scope.calHistry, function (index, value) {

                    if ($scope.CalProcess == '') {
                        $scope.CalProcess = '= ';
                    }

                    $scope.CalProcess = $scope.CalProcess + ' ' + value;
                });

                $scope.Number = 0;
            }
            else {
                $scope.calHistry = [];
                if ($scope.calHistry.length > 0) {
                    $scope.calHistry.push('x')
                }
                $scope.calHistry.push($scope.RemainderValue);

                $scope.NumberChange();
            }
        }

        $scope.Addition = function () {

            $scope.CalType = 2;

            if ($scope.RemainderValue == 0 && $scope.Number > 0) {
                $scope.RemainderValue = $scope.Number;                

                /***************************/
                $scope.calHistry = [];
                if ($scope.calHistry.length > 0) {
                    $scope.calHistry.push('+')
                }

                $scope.calHistry.push($scope.Number)


                $scope.CalProcess = '';
                $.each($scope.calHistry, function (index, value) {

                    if ($scope.CalProcess == '') {
                        $scope.CalProcess = '= ';
                    }

                    $scope.CalProcess = $scope.CalProcess + ' ' + value;
                });

                $scope.Number = 0;
            }
            else {

                $scope.calHistry = [];
                if ($scope.calHistry.length > 0) {
                    $scope.calHistry.push('+')
                }
                $scope.calHistry.push($scope.RemainderValue);

                $scope.NumberChange();
            }
        };

        /*************************************/

        $scope.Equal = function () {

            switch ($scope.CalType) {
                case 1:
                    var val = ($scope.RemainderValue * $scope.Number);
                    $scope.Number = val;
                    $scope.RemainderValue = 0;
                    break;
                case 2:
                    var val = (parseFloat($scope.RemainderValue) + parseFloat($scope.Number));
                    $scope.Number = val;
                    $scope.RemainderValue = 0;
                    break;
                default:
                    break;
            }
        }

        $scope.Symbole = function () {
            var sym = '';
            switch ($scope.CalType) {
                case 1:
                    sym = ' x ';
                    break;
                case 2:
                    sym = ' + ';
                    break;
                default:
                    break;
            }
            return sym;
        }

    });

});