'use strict';

angular.module('witadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('authority', {
                parent: 'entity',
                url: '/authoritys',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.authority.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/authority/authoritys.html',
                        controller: 'AuthorityController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('authority');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('authority.detail', {
                parent: 'entity',
                url: '/authority/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.authority.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/authority/authority-detail.html',
                        controller: 'AuthorityDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('authority');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Authority', function($stateParams, Authority) {
                        return Authority.get({id : $stateParams.id});
                    }]
                }
            })
            .state('authority.new', {
                parent: 'authority',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/authority/authority-dialog.html',
                        controller: 'AuthorityDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {name: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('authority', null, { reload: true });
                    }, function() {
                        $state.go('authority');
                    })
                }]
            })
            .state('authority.edit', {
                parent: 'authority',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/authority/authority-dialog.html',
                        controller: 'AuthorityDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Authority', function(Authority) {
                                return Authority.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('authority', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
