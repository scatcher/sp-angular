'use strict';

angular.module('OneApp')
    .service('configService', function (toastrConfig) {

        /** Set the default toast location */
        toastrConfig.positionClass = 'toast-bottom-right';

        /** Flag to use cached XML files from the app/dev folder */
        var offline = window.location.href.indexOf('localhost') > -1;

        return {
            appTitle: 'One App Core',
            debugEnabled: true,
            firebaseURL: "The url of your firebase source",
            offline: offline
        }
    });