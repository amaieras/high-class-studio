/**
 * Created by Andrei on 11/17/2016.
 */

highclassApp.controller('CountdownController', ['$scope',  'CountdownService',
    function($scope, CountdownService) {
        CountdownService.getCountdownApp(function(val){
            $scope.firstDigitCurrentCnt = val.toString().charAt(0);
            $scope.secondDigitCurrentCnt = val.toString().charAt(1);
        });
        $scope.decrementCountdownApp = function(){
            CountdownService.decrementCountdownApp();
        };

    }]);
