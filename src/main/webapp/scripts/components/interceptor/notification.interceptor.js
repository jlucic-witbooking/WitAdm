 'use strict';

angular.module('witadminApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-witadminApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-witadminApp-params')});
                }
                return response;
            },
        };
    });