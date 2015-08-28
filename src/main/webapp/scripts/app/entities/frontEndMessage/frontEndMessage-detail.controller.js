'use strict';

angular.module('witadminApp')
    .controller('FrontEndMessageDetailController', function ($scope, $rootScope, $stateParams, entity, FrontEndMessage) {
        $scope.frontEndMessage = entity;
        $scope.load = function (id) {
            FrontEndMessage.get({id: id}, function(result) {
                $scope.frontEndMessage = result;
            });
        };
        $rootScope.$on('witadminApp:frontEndMessageUpdate', function(event, result) {
            $scope.frontEndMessage = result;
        });
    });
