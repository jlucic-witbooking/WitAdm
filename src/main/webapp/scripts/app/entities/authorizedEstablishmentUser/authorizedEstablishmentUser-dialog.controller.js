'use strict';

angular.module('witadminApp').controller('AuthorizedEstablishmentUserDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'AuthorizedEstablishmentUser', 'User', 'UserGroup', 'Authority', 'BookingEngine',
        function($scope, $stateParams, $modalInstance, entity, AuthorizedEstablishmentUser, User, UserGroup, Authority, BookingEngine) {

        $scope.authorizedEstablishmentUser = entity;
        $scope.users = User.query();
        $scope.usergroups = UserGroup.query();
        $scope.authoritys = Authority.query();
        $scope.bookingengines = BookingEngine.query();
        $scope.load = function(id) {
            AuthorizedEstablishmentUser.get({id : id}, function(result) {
                $scope.authorizedEstablishmentUser = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('witadminApp:authorizedEstablishmentUserUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.authorizedEstablishmentUser.id != null) {
                AuthorizedEstablishmentUser.update($scope.authorizedEstablishmentUser, onSaveFinished);
            } else {
                AuthorizedEstablishmentUser.save($scope.authorizedEstablishmentUser, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
