'use strict';

angular.module('witadminApp')
    .controller('UserGroupDetailController', function ($scope, $rootScope, $stateParams, entity, UserGroup, User) {
        $scope.userGroup = entity;
        $scope.load = function (id) {
            UserGroup.get({id: id}, function(result) {
                $scope.userGroup = result;
            });
        };
        $rootScope.$on('witadminApp:userGroupUpdate', function(event, result) {
            $scope.userGroup = result;
        });
    });
