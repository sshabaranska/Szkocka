;(function() {
    'use strict';

    angular
        .module('about')
        .controller('AboutController', AboutController);

    /* ngInject */
    function AboutController($scope, aboutService, userService, AboutContentResolver) {
        /** @public {Boolean} */
        $scope.showEditButton = userService.isAdmin();
        /** @public {String} */
        $scope.description = AboutContentResolver.data.content;
        /** @public {String} */
        $scope.editedDescription = $scope.description;
        /** @public {Boolean} */
        $scope.showEditableTexarea = false;

        /** @public {String} */
        $scope.save = save;
        /** @public {String} */
        $scope.edit = edit;
        /** @public {String} */
        $scope.cancel = cancel;

        /**
         * @public
         */
        $scope.save = function() {
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

        /**
         * @public
         */
        $scope.edit = function() {
              $scope.showEditableTexarea = true;
        }

        /**
         * @public
         */
        $scope.cancel = function() {
            $scope.showEditableTexarea = false;
        }
    }
})();