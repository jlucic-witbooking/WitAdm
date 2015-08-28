'use strict';

angular.module('witadminApp').controller('AuthorityDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Authority', 'Permission',
        function($scope, $stateParams, $modalInstance, entity, Authority, Permission) {

        $scope.authority = entity;
        $scope.permissions = Permission.query();
        $scope.load = function(id) {
            Authority.get({id : id}, function(result) {
                $scope.authority = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('witadminApp:authorityUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.authority.id != null) {
                Authority.update($scope.authority, onSaveFinished);
            } else {
                Authority.save($scope.authority, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
