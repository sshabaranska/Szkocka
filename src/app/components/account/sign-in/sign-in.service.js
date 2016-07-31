;(function() {
    'use strict';

    angular
        .module('sign-in')
        .factory('signInService', signInService);

    /* ngInject */
    function signInService($http, API_URL, authService, Assert) {
        return {
            /**
             * Create a new user
             * public
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            signIn: function(user, callback) {
                Assert.isObject(user, 'Invalid "user" type');

                var cb = callback || angular.noop;

                $http.post(API_URL + 'auth/local', user)
                .then(
                    function(response) {
                        authService.auth(response.data.token, callback);
                    },
                    function(err) {
                        $rootScope.signOut();
                        callback(err, null);
                    });
            }
        };
    }
})();