'use strict';

angular.module('witadminApp')
    .controller('AuthorityController', function ($scope, Authority, ParseLinks) {
        $scope.authoritys = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Authority.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.authoritys.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.authoritys = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Authority.get({id: id}, function(result) {
                $scope.authority = result;
                $('#deleteAuthorityConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Authority.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteAuthorityConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.authority = {name: null, id: null};
        };
    });
