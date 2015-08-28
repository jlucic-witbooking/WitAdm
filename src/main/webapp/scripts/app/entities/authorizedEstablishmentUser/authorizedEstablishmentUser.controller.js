'use strict';

angular.module('witadminApp')
    .controller('AuthorizedEstablishmentUserController', function ($scope, AuthorizedEstablishmentUser, ParseLinks) {
        $scope.authorizedEstablishmentUsers = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            AuthorizedEstablishmentUser.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.authorizedEstablishmentUsers.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.authorizedEstablishmentUsers = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            AuthorizedEstablishmentUser.get({id: id}, function(result) {
                $scope.authorizedEstablishmentUser = result;
                $('#deleteAuthorizedEstablishmentUserConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            AuthorizedEstablishmentUser.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteAuthorizedEstablishmentUserConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.authorizedEstablishmentUser = {id: null};
        };
    });
