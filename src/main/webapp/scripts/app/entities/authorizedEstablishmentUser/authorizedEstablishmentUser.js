'use strict';

angular.module('witadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('authorizedEstablishmentUser', {
                parent: 'entity',
                url: '/authorizedEstablishmentUsers',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.authorizedEstablishmentUser.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/authorizedEstablishmentUser/authorizedEstablishmentUsers.html',
                        controller: 'AuthorizedEstablishmentUserController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('authorizedEstablishmentUser');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('authorizedEstablishmentUser.detail', {
                parent: 'entity',
                url: '/authorizedEstablishmentUser/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.authorizedEstablishmentUser.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/authorizedEstablishmentUser/authorizedEstablishmentUser-detail.html',
                        controller: 'AuthorizedEstablishmentUserDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('authorizedEstablishmentUser');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'AuthorizedEstablishmentUser', function($stateParams, AuthorizedEstablishmentUser) {
                        return AuthorizedEstablishmentUser.get({id : $stateParams.id});
                    }]
                }
            })
            .state('authorizedEstablishmentUser.new', {
                parent: 'authorizedEstablishmentUser',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/authorizedEstablishmentUser/authorizedEstablishmentUser-dialog.html',
                        controller: 'AuthorizedEstablishmentUserDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('authorizedEstablishmentUser', null, { reload: true });
                    }, function() {
                        $state.go('authorizedEstablishmentUser');
                    })
                }]
            })
            .state('authorizedEstablishmentUser.edit', {
                parent: 'authorizedEstablishmentUser',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/authorizedEstablishmentUser/authorizedEstablishmentUser-dialog.html',
                        controller: 'AuthorizedEstablishmentUserDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['AuthorizedEstablishmentUser', function(AuthorizedEstablishmentUser) {
                                return AuthorizedEstablishmentUser.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('authorizedEstablishmentUser', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
