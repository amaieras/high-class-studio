/**
 * Created by Andrei on 8/2/2016.
 */
angular.module('firebase.ref', ['firebase', 'firebase.config'])
    .factory('Ref', ['$window', 'FIREBASE_URL', function($window, FIREBASE_URL) {
        'use strict';
        return new firebase.database().ref();
    }]);
