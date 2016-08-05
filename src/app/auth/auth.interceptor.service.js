;(function() {
    angular
        .module('auth')
        .factory('authInterceptorService', authInterceptorService);

    /* ngInject */
    function authInterceptorService($q, $timeout, $rootScope) {
        return {
            responseError: responseError
        };

        function responseError(response) {
            if (response.status === 401) {
                $timeout(function() {
                    $rootScope.signOut();
                });
            }
            return $q.reject(response);
        }
    }
})();