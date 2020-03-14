/**
 * Created by Andrei on 7/24/2016.
 */

highclassApp.controller('AppointmentController', ['$scope', 'Auth', '$location', '$timeout', 'AppointmentService','CountdownService',
    function($scope, Auth, $location, $timeout, AppointmentService, CountdownService) {
        $scope.isSigned=false;
        $scope.addAppointments = function() {
            $scope.name = $scope.appointmentCtrl.name;
            if($scope.appointmentCtrl.name === undefined || $scope.appointmentCtrl.email === undefined || $scope.appointmentCtrl.phone === undefined
            || !$scope.isSigned){
                return false;
            }

            if (AppointmentService.checkPhoneValidity($scope.appointmentCtrl.phone)) {
                AppointmentService.addAppointment($scope.appointmentCtrl.name, $scope.appointmentCtrl.email, $scope.appointmentCtrl.phone).then(
                    function () {
                        CountdownService.decrementCountdownApp();
                        $scope.isAppoint = true;
                        $scope.isSigned = false;
                        $scope.appointmentCtrl.name = undefined;
                        $scope.appointmentCtrl.email = undefined;
                        $scope.appointmentCtrl.phone = undefined;
                        $scope.form.$setPristine();
                        $scope.form.$setUntouched();
                        $timeout(function () {
                            $scope.isAppoint = false;
                        }, 10000);
                    })
                    .catch(
                        function () {
                            alert('Programarea nu a putut fi realizata. Te rugam sa incerci din nou.');
                        })
            }
            else {
                alert("Numarul de telefon introdus este prea scurt.");
                return false;
            }
        }
        $scope.hideSuccesMsg = function() {
            return !$scope.isAppoint;
        }
        $scope.logout = function () {
            Auth.$signOut();
            //var toRemove = firebase.database().ref();
            //toRemove.remove();
            $location.path('/login');
        }
        $scope.removeAppointment = function(value) {
                firebase.database().ref().child("appointments/" + value).remove();
                    if(!$scope.$$phase) {
                        $scope.$apply();
                    }

            }
        $scope.nameOrEmailFilter = function(appointment){
                if(appointment.name !== undefined){
                    return (angular.lowercase(appointment.name).indexOf(angular.lowercase($scope.nameOrEmail) || '') !== -1 ||
                    angular.lowercase(appointment.email).indexOf(angular.lowercase($scope.nameOrEmail) || '') !== -1);
                }
                return false;
            };
        $scope.sortDateAdded = function(appointment) {
            var date = new Date(appointment.dateAdded);
            return date;
        };

}]);

highclassApp.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);