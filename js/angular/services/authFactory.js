/**
 * Created by Andrei on 7/29/2016.
 */
highclassApp.factory('authFactory', ['FIREBASE_URL', '$firebaseAuth', function(FIREBASE_URL, $firebaseAuth){
    var authFactory = {};
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    authFactory.authUser = function(email, password) {
        return auth.$authWithPassword({
            email: email,
            password: password
        });
    }
    return authFactory;
}])