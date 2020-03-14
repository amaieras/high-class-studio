/**
 * Created by Andrei on 8/2/2016.
 */
(function() {
    'use strict';
    angular.module('firebase.auth', ['firebase', 'firebase.ref'])

        .factory('Auth', function($firebaseAuth, Ref) {
            return $firebaseAuth();
        });
})();
