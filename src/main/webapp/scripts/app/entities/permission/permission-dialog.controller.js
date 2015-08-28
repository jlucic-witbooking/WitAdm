'use strict';

angular.module('witadminApp').controller('PermissionDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Permission',
        function($scope, $stateParams, $modalInstance, entity, Permission) {

        $scope.permission = entity;
        $scope.load = function(id) {
            Permission.get({id : id}, function(result) {
                $scope.permission = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('witadminApp:permissionUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.permission.id != null) {
                Permission.update($scope.permission, onSaveFinished);
            } else {
                Permission.save($scope.permission, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
