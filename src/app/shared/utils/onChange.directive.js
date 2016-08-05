;(function() {
    'use strict';

    angular
        .module('utils')
        .directive('customOnChange', customOnChange);

    /* ngInject */
    function customOnChange($window) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    }
})();