'use strict';

angular.module('witadminApp')
    .controller('UserGroupController', function ($scope, UserGroup, ParseLinks) {
        $scope.userGroups = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            UserGroup.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.userGroups = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            UserGroup.get({id: id}, function(result) {
                $scope.userGroup = result;
                $('#deleteUserGroupConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            UserGroup.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteUserGroupConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userGroup = {name: null, id: null};
        };
    });
