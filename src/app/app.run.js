;(function() {
    'use strict';

    angular
        .module('app')
        .run(run);

    /* ngInject */
    function run(Auth) {
        Auth.init().then( function() {});
    }
})();
