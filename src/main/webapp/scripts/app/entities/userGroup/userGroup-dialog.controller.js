'use strict';

angular.module('witadminApp').controller('UserGroupDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'UserGroup', 'User',
        function($scope, $stateParams, $modalInstance, entity, UserGroup, User) {

        $scope.userGroup = entity;
        $scope.users = User.query();
        $scope.load = function(id) {
            UserGroup.get({id : id}, function(result) {
                $scope.userGroup = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('witadminApp:userGroupUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.userGroup.id != null) {
                UserGroup.update($scope.userGroup, onSaveFinished);
            } else {
                UserGroup.save($scope.userGroup, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
