'use strict';

angular.module('witadminApp').controller('BookingEngineDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'BookingEngine',
        function($scope, $stateParams, $modalInstance, entity, BookingEngine) {

        $scope.bookingEngine = entity;
        $scope.load = function(id) {
            BookingEngine.get({id : id}, function(result) {
                $scope.bookingEngine = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('witadminApp:bookingEngineUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.bookingEngine.id != null) {
                BookingEngine.update($scope.bookingEngine, onSaveFinished);
            } else {
                BookingEngine.save($scope.bookingEngine, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
