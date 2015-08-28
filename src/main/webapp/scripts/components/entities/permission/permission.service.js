'use strict';

angular.module('witadminApp')
    .factory('Permission', function ($resource, DateUtils) {
        return $resource('api/permissions/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
