;(function() {
    'use strict';

    angular
        .module('appSettings')
        .factory('AppSettings', appSettingsService);

    /* ngInject */
    function appSettingsService(CacheStore, Type, Assert) {

        /**
         * Current services is used for saving and working with application settings
         */
        return {
            /** @private {String} */
            _settingsName: 'appSettings',

            /**
             * @private
             * @return {Object}
             */
            _getSettingsData: function() {
                var settings = CacheStore.getItem(this._settingsName);

                if (Type.isString(settings)) {
                    return JSON.parse(settings);
                } else {
                    settings = window.CONFIGURATION.getOptions();
                    this.saveSettings(settings);
                    return settings;
                }
            },

            /**
             * @public
             * @param {Object} settings
             */
            saveSettings: function(settings) {
                Assert.isString(settings.API_URL, 'Invalid "API_URL" type');
                Assert.isNumber(settings.loadLimit, 'Invalid "loadLimit" type');

                this._settings = settings;
                CacheStore.cacheItem(this._settingsName, JSON.stringify(this._settings));
            },

            /**
             * @public
             * @return {String}
             */
            getAppServer: function() {
                return this._settings.API_URL;
            },

            /**
             * @public
             * @return {Number}
             */
            getLoadLimit: function() {
                return this._settings.loadLimit;
            },

            /**
             * @public
             * @return {Number}
             */
            getCarouselInterval: function() {
                return this._settings.carouselInterval;
            },

            /**
             * @public
             * @return {Number}
             */
            getTagsShortListQty: function() {
                return this._settings.tagsShortListQty;
            },

            /**
             * @public
             * @return {Object}
             */
            getAppSettings: function() {
                return this._settings;
            },

            _settings: this._getSettingsData()
        };
    };
})();