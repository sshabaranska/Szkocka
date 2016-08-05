;(function() {
    'use strict';

    angular
        .module('about')
        .controller('AboutController', AboutController);

    /* ngInject */
    function AboutController($scope, aboutService, userService, AboutContentResolver) {
        $scope.showEditButton = userService.isAdmin();
        $scope.description = AboutContentResolver.data.content;
        $scope.editedDescription = $scope.description;
        $scope.showEditableTexarea = false;

        $scope.save = save;
        $scope.edit = edit;
        $scope.cancel = cancel;


        function save() {
            aboutService.update({
                    content: $scope.editedDescription
                }).then(function(response){
	                    $scope.description = $scope.editedDescription;
	                    $scope.showEditableTexarea = false;
                        //TODO: Show success message in some dialog window or toast
                        console.log('Saved...');
	                }, function(error){
                        //TODO: Show server error in some dialog window or toast
                        console.log(error.message);
	                });
        }

        function edit() {
              $scope.showEditableTexarea = true;
        }

        function cancel() {
            $scope.showEditableTexarea = false;
        }
    }
})();