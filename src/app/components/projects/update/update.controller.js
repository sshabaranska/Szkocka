;(function() {
    'use strict';

    angular
        .module('project-update')
        .controller('UpdateController', UpdateController);

    /* ngInject */
    function UpdateController($scope, $state, UpdateResolver, projectsService,
    	Assert, Type) {
        /** @public {Object} */
        $scope.project = UpdateResolver.data;
        /** @public {Array<Object>} */
        $scope.statuses = [
            {
                id: 'active',
                name: 'Active'
            },
            {
                id: 'closed',
                name: 'Closed'
            },
            {
                id: 'onhold',
                name: 'On Hold'
            }
        ];

        $scope.update = update;
        $scope.removeResearcher = removeResearcher;
        $scope.onFileSelect = onFileSelect;
        /**
         * @public
         * @param {Boolean} valid
         */
        function update(valid) {
            if(!valid) {
                return;
            }

            var params = {
                researchId: $scope.project.id,
                title: $scope.project.title,
                image_url: $scope.project.image_url,
                status: $scope.project.status,
                description: {
                    brief: $scope.project.description.brief,
                    detailed: $scope.project.description.detailed
                }
            };

            projectsService.update(params)
            	.then(function(res) {
            		$state.go('project.about', {id: $scope.project.id});
            	}, function(err) {
            		console.log(err);
            	});
        };

        /**
         * @public
         * @param {Object} researcher
         */
        function removeResearcher(researcher) {
            var params = {
                researchId: $scope.project.id,
                researcherId: researcher.id
            };

            projectsService.removeResearcher(params)
            	.then(function(res) {
            		for (var i = 0; i < $scope.project.researchers.length; i++) {
                        if ($scope.project.researchers[i].id == researcher.id) {
                            $scope.project.researchers.splice(i, 1);
                        }
                    };
            	}, function(err) {
            		console.log(err);
            	});
        };
	};
})();