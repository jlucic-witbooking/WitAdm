'use strict';

angular.module('witadminApp')
    .controller('AuthorityDetailController', function ($scope, $rootScope, $stateParams, entity, Authority, Permission) {
        $scope.authority = entity;
        $scope.load = function (id) {
            Authority.get({id: id}, function(result) {
                $scope.authority = result;
            });
        };
        $rootScope.$on('witadminApp:authorityUpdate', function(event, result) {
            $scope.authority = result;
        });
    });
