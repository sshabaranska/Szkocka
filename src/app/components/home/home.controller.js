;(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    /* ngInject */
    function HomeController($scope, projectsService) {
        projectsService.getProjects()
            .then(function(data) {
                //console.log(data);
            }, function() {

            });
    }
})();