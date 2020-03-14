/**
 * Created by Andrei on 8/2/2016.
 */
angular.module('firebase.config', [])
    .constant('FIREBASE_URL', 'https://highclassstudioprod.firebaseio.com')
    .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google'])
    .constant('loginRedirectPath', '/login')