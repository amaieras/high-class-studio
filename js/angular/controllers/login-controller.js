/**
 * Created by Andrei on 7/29/2016.
 */
highclassApp.controller('LoginController', ['FIREBASE_URL','$firebaseAuth', 'authFactory', '$location', '$scope','$firebaseObject', '$route', '$templateCache'
    ,function(FIREBASE_URL, $firebaseAuth, authFactory, $location, $scope, $firebaseObject, $route, $templateCache){
        $scope.login = function(){
            firebase.auth().signInWithEmailAndPassword($scope.loginEmail, $scope.loginPassword).then(function(){
                $location.path('/programari');
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }



}])