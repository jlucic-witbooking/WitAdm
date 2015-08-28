'use strict';

angular.module('witadminApp')
    .factory('BookingEngine', function ($resource, DateUtils) {
        return $resource('api/bookingEngines/:id', {}, {
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
