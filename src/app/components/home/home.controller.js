;(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    /* ngInject */
    function HomeController($scope, $rootScope, projectsService, LOAD_LIMIT,
        TAGS_SHORT_LIST_QTY, CAROUSEL_INTERVAL, Assert, Type) {
        /** @public {Array<Object>} */
        $scope.latest5 = [];
        /** @private {Number} */
        $scope.carouselInterval = CAROUSEL_INTERVAL;
        /** @public {Array<Object>} */
        $scope.projectsList = [];
        /** @private {Array<Object>} */
        $scope.tags = [];
        /** @public {Array<Object>} */
        $scope.viewTags = [];
        /** @public {Boolean} */
        $scope.showTagsShortList = true;
        /** @public {Boolean} */
        $scope.loadMoreAvailable = true;
        /** @private {String} */
        $scope.filterEventName = 'projectsFilter';
        /** @private {Object} */
        $scope.searchParams = {
            keyword: null,
            status: 'active',
            tag: null,
            page: 0
        };

        /** @public {String} */
        $scope.errorMsg = '';

        $scope._getTags = _getTags;
        $scope._getTagsToShow = _getTagsToShow;
        $scope._init = _init;
        $scope.loadMore = loadMore;
        $scope.showActiveProjects = showActiveProjects;
        $scope.showAllProjects = showAllProjects;
        $scope.search = search;
        $scope.clearTag = clearTag;
        $scope.activateTag = activateTag;
        $scope.showAllTags = showAllTags;
        $scope.showLessTags = showLessTags;

        /**
         * @private
         */
        function _getTags() {
            projectsService.getTags()
                .then(function(res) {
                    $scope.tags = _.uniq(res.data.tags);

                    if ($scope.tags.length > TAGS_SHORT_LIST_QTY) {
                        $scope._getTagsToShow();
                    } else {
                        $scope.viewTags = $scope.tags;
                    }
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @public
         */
        function loadMore() {
            if($scope.loadMoreAvailable) {
                $scope._init();
            }
        };

        /**
         * @private
         */
        function _init() {
            projectsService.query($scope.searchParams)
                .then(function(res) {
                    if(_.find($scope.projectsList, function(proj) {
                        return proj.id == res.data.researches[0].id; })
                        ) {
                        return;
                    }
                    if (res.data.researches.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }

                    res.data.researches.forEach(function(proj){
                        $scope.projectsList.push(proj);
                    });

                    $scope.latest5 = _.take($scope.projectsList, 5);
                    $scope.searchParams.page = $scope.searchParams.page + 1;
                    
                    // fire event to redraw main image slider carousel
                    $rootScope.$broadcast($scope.filterEventName);
                }, function(err) {
                    $scope.errorMsg = err.message;
                    $scope.loadMoreAvailable = false;
                });
        };

        /**
         * @public
         */
        function showActiveProjects() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = null;
            $scope.searchParams.status = 'active';
            $scope.loadMoreAvailable = true;
            $scope._init();
        };

        /**
         * @public
         */
        function showAllProjects() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = null;
            $scope.searchParams.status = null;
            $scope.loadMoreAvailable = true;
            $scope._init();
        };

        /**
         * @public
         */
        function search() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.tag = null;
            $scope.loadMoreAvailable = true;
            $scope._init();
        };

        /**
         * @public
         */
        function clearTag() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = null;
            $scope.searchParams.tag = null;
            $scope.loadMoreAvailable = true;
            $scope._init();
        };

        /**
         * @public
         * @param {String} tag
         */
        function activateTag(tag) {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = null;
            $scope.searchParams.tag = tag;
            $scope.loadMoreAvailable = true;
            $scope._init();
        };

        /**
         * @public
         */
        function showAllTags() {
            $scope.viewTags = $scope.tags;
            $scope.showTagsShortList = false;
        };

        /**
         * @public
         */
        function showLessTags() {
            $scope._getTagsToShow();
            $scope.showTagsShortList = true;
        };

        /**
         * @public
         */
        function _getTagsToShow() {
            $scope.viewTags = _.take($scope.tags, TAGS_SHORT_LIST_QTY);
        };

        $scope._init();
        $scope._getTags();
    }
})();