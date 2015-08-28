'use strict';

angular.module('witadminApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


