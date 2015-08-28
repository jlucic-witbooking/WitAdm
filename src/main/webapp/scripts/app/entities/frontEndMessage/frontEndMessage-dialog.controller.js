'use strict';

angular.module('witadminApp').controller('FrontEndMessageDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'FrontEndMessage',
        function($scope, $stateParams, $modalInstance, entity, FrontEndMessage) {

        $scope.frontEndMessage = entity;
        $scope.load = function(id) {
            FrontEndMessage.get({id : id}, function(result) {
                $scope.frontEndMessage = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('witadminApp:frontEndMessageUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.frontEndMessage.id != null) {
                FrontEndMessage.update($scope.frontEndMessage, onSaveFinished);
            } else {
                FrontEndMessage.save($scope.frontEndMessage, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
