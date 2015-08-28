'use strict';

angular.module('witadminApp')
    .factory('FrontEndMessage', function ($resource, DateUtils) {
        return $resource('api/frontEndMessages/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.start = DateUtils.convertDateTimeFromServer(data.start);
                    data.end = DateUtils.convertDateTimeFromServer(data.end);
                    data.creation = DateUtils.convertDateTimeFromServer(data.creation);
                    data.lastModification = DateUtils.convertDateTimeFromServer(data.lastModification);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
