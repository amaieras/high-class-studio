/**
 * Created by Andrei on 8/2/2016.
 */
highclassApp.controller('LogoutController', ['Auth', '$scope', '$location'
    ,function(Auth, $scope, $location){
        $scope.logout = function () {
            Auth.$signOut();
            //var toRemove = firebase.database().ref();
            //toRemove.remove();
            $location.path('/login');
        }
    }])