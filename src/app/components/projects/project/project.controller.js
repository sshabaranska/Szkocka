;(function() {
    'use strict';

    angular
        .module('project')
        .controller('ProjectController', ProjectController);

    /* ngInject */
    function ProjectController($scope, accountService, ProjectResolver, projectsService, Assert, Type) {
        /** @private {Object} */
        $scope.project = ProjectResolver.data;
        /** @public {Object} */
        $scope.user = accountService.getCurrentUser();
        /** @public {Array<Object>} */
        $scope.joinRequests = [];
        /** @public {Boolean} */
        $scope.isSupervisor = false;
        /** @public {Boolean} */
        $scope.canJoinProject = false;

        /** @public {String} */
        $scope.errorMsg = null;

        $scope._init = _init;
        $scope._getJoinRequests = _getJoinRequests;
        $scope.edit = edit;
        $scope.join = join;
        $scope.accept = accept;
        $scope.ignore = ignore;

        /**
         * @private
         */
        function _init() {
            $scope.errorMsg = '';

            if($scope.project.relationship_type === 'NONE') {
                $scope.canJoinProject = true;
            }

            if($scope.user && $scope.user._id == $scope.project.supervisor.id ){
                $scope.isSupervisor = true;
                $scope._getJoinRequests();
            }
        };

        /**
         * @private
         */
        function _getJoinRequests() {
            projectsService.getJoinRequests($scope.project.id)
                .then(function(res) {
                    $scope.joinRequests = res.data.users;

                    if (_.any($scope.joinRequests, function(request) {
                        return request.id == $scope.user._id;
                    })) {
                        $scope.canJoinProject = false;
                    }
                }, function(err) {
                    console.log(err.message);
                });
        };


        /**
         * @public
         */
        function edit() {
            $state.go('project-update', {id: $scope.project.id});
        };

        /**
         * @public
         */
        function join() {
            projectsService.joinResearch({id: $scope.project.id, text: "DEF"})
                .then(function(res) {
                    $scope.canJoinProject = false;
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @public
         * @param {Object} user
         */
        function accept(user) {
            Assert.isObject(user, 'Invalid "user" type');

            var params = {
                researchId: $scope.project.id,
                userId: user.id
            };

            projectsService.aproveResearcher(params)
                .then(function(res) {
                     $scope._getJoinRequests();
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @public
         * @param {Object} user
         */
        function ignore(user) {
            Assert.isObject(user, 'Invalid "user" type');

            var params = {
                researchId: $scope.project.id,
                userId: user.id
            };

            projectsService.rejectResearcher(params)
                .then(function(res) {
                     $scope._getJoinRequests();
                }, function(err) {
                    console.log(err.message);
                });
        };

        $scope._init();
    }
})();