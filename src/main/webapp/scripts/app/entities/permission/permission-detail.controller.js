'use strict';

angular.module('witadminApp')
    .controller('PermissionDetailController', function ($scope, $rootScope, $stateParams, entity, Permission) {
        $scope.permission = entity;
        $scope.load = function (id) {
            Permission.get({id: id}, function(result) {
                $scope.permission = result;
            });
        };
        $rootScope.$on('witadminApp:permissionUpdate', function(event, result) {
            $scope.permission = result;
        });
    });
