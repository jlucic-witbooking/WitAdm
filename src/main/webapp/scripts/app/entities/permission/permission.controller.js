'use strict';

angular.module('witadminApp')
    .controller('PermissionController', function ($scope, Permission, ParseLinks) {
        $scope.permissions = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Permission.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.permissions.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.permissions = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Permission.get({id: id}, function(result) {
                $scope.permission = result;
                $('#deletePermissionConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Permission.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deletePermissionConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.permission = {name: null, description: null, id: null};
        };
    });
