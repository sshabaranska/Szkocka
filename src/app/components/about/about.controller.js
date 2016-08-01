;(function() {
    'use strict';

    angular
        .module('about')
        .controller('AboutController', AboutController);

    /* ngInject */
    function AboutController($scope, AboutContentResolver, aboutService, userService, Assert, Type) {
    	/** @public {Boolean} */
        //$scope.showEditButton = userService.isAdmin();
        $scope.showEditButton = true;
        /** @public {Object} */
        $scope.aboutProject = {
            currentDescription: AboutContentResolver.data.content,
            newDescription: AboutContentResolver.data.content
        };
        /** @public {String} */
        $scope.errorMsg = '';
        /** @public {String} */
        $scope.successMsg = '';
        /** @public {Boolean} */
        $scope.showEditableTexarea = false;

        /**
         * @public
         */
        $scope.updateAbout = function() {
            var params = {
                content: $scope.aboutProject.newDescription
            };

            aboutService.updateAboutInfo(params)
	            .then(function(response){
	                    $scope.aboutProject.currentDescription = $scope.aboutProject.newDescription;
	                    $scope.successMsg = 'Saved';
	                    $scope.showEditableTexarea = false;
	                }, function(err){
	                    $scope.errorMsg = 'Error';
	                    console.log(err.message);
	                });
        };

        /**
         * @public
         */
        $scope.edit = function() {
              $scope.errorMsg = '';
              $scope.successMsg = '';
              $scope.showEditableTexarea = true;
        };

        /**
         * @public
         */
        $scope.cancel = function() {
            $scope.showEditableTexarea = false;
        };
    }
})();