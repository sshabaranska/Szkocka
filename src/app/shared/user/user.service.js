;(function() {
    'use strict';

    angular
        .module('user')
        .factory('userService', userService);

    /* ngInject */
    function userService($resource, AppSettings) {

        /** @private {String} */
        var url = AppSettings.getAppServer();

        return $resource(url + 'users/:id/:controller',
            {
                id: '@_id'
            },
            {
                changePassword: {
                    method: 'PUT',
                    params: {
                        id:'me',
                        controller:'password'
                    }
                },
                get: {
                    method: 'GET',
                    params: {
                        id:'me'
                    }
                },
                query: {
                    method: 'GET', 
                    isArray: false
                },

                getResearches: {
                    method: 'GET', 
                    isArray: false,
                    params: {
                        controller:'researches'
                    }
                },
                getForums: {
                    method: 'GET', 
                    isArray: false,
                    params: {
                        controller:'forums'
                    }
                },
                getMessages: {
                    method: 'GET', 
                    isArray: false,
                    params: {
                        controller:'messages'
                    }
                }
            });
    };
})();
