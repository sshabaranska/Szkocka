;(function() {
    'use strict';

    angular
        .module('sign-up')
        .factory('signUpService', signUpService);

    /* ngInject */
    function signUpService($http, $rootScope, API_URL, authService, Assert, Type) {
        return {
            /**
             * Create a new user
             * public
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            signUp: function(user, callback) {
                Assert.isObject(user, 'Invalid "user" type');

                var cb = callback || angular.noop;

                $http.post(API_URL + 'users', user)
                .then(
                    function(response) {
                        authService.auth(response.data.token, callback);
                        //callback(null, response);
                    },
                    function(err) {
                        $rootScope.signOut();
                        callback(err, null);
                    });
            }
        };
    }
})();