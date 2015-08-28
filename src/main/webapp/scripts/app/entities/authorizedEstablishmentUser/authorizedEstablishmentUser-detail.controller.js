'use strict';

angular.module('witadminApp')
    .controller('AuthorizedEstablishmentUserDetailController', function ($scope, $rootScope, $stateParams, entity, AuthorizedEstablishmentUser, User, UserGroup, Authority, BookingEngine) {
        $scope.authorizedEstablishmentUser = entity;
        $scope.load = function (id) {
            AuthorizedEstablishmentUser.get({id: id}, function(result) {
                $scope.authorizedEstablishmentUser = result;
            });
        };
        $rootScope.$on('witadminApp:authorizedEstablishmentUserUpdate', function(event, result) {
            $scope.authorizedEstablishmentUser = result;
        });
    });
