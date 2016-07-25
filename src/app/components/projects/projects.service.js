;(function() {
    'use strict';

    angular
        .module('projects')
        .factory('projectsService', projectsService);

    /* ngInject */
    function projectsService($http, API_URL) {
        return {
            getProjects: getProjects
        };

        function getProjects() {
            return $http.get(API_URL + 'queries/researches');
        }
    }
})();