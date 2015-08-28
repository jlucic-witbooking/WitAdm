'use strict';

angular.module('witadminApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
