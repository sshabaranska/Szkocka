;(function() {
    'use strict';

    angular
        .module('project.participants')
        .controller('ProjectParticipantsController', ProjectParticipantsController);

    /* ngInject */
    function ProjectParticipantsController($scope, projectsService, Assert) {
    	/** @public {Boolean} */
        $scope.inviteSent = false;
        /** @public {Object} */
        $scope.newResearcher = {};

        $scope.inviteResearcher = inviteResearcher;

        /**
         * @public
		 * @param {Boolean} valid
         */
        function inviteResearcher(valid){
        	Assert.isBoolean(valid, 'Invalid "valid" type');

        	if (!valid) {
        		return;
        	}
            $scope.newResearcher.researchId = $scope.project.id;

            projectsService.sendInvitation($scope.newResearcher)
            	.then(function(res) {
            		$scope.newResearcher = {};
                    $scope.inviteSent = true;
            	}, function(err) {
            		$scope.inviteSent = false;
            		console.log(err.message);
            	});
        };
    }
})();