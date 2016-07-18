;(function() {
    'use strict';

    angular
        .module('projects')
        .factory('projectsService', projectsService);

    /* ngInject */
    function projectsService() {
        return {
            getProjects: getProjects
        };

        function getProjects() {

        }
    }
})();