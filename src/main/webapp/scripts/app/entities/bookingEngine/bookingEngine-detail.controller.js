'use strict';

angular.module('witadminApp')
    .controller('BookingEngineDetailController', function ($scope, $rootScope, $stateParams, entity, BookingEngine) {
        $scope.bookingEngine = entity;
        $scope.load = function (id) {
            BookingEngine.get({id: id}, function(result) {
                $scope.bookingEngine = result;
            });
        };
        $rootScope.$on('witadminApp:bookingEngineUpdate', function(event, result) {
            $scope.bookingEngine = result;
        });
    });
