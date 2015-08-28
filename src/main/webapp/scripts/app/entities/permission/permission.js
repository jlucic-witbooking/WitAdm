'use strict';

angular.module('witadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('permission', {
                parent: 'entity',
                url: '/permissions',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.permission.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/permission/permissions.html',
                        controller: 'PermissionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('permission');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('permission.detail', {
                parent: 'entity',
                url: '/permission/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.permission.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/permission/permission-detail.html',
                        controller: 'PermissionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('permission');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Permission', function($stateParams, Permission) {
                        return Permission.get({id : $stateParams.id});
                    }]
                }
            })
            .state('permission.new', {
                parent: 'permission',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/permission/permission-dialog.html',
                        controller: 'PermissionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {name: null, description: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('permission', null, { reload: true });
                    }, function() {
                        $state.go('permission');
                    })
                }]
            })
            .state('permission.edit', {
                parent: 'permission',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/permission/permission-dialog.html',
                        controller: 'PermissionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Permission', function(Permission) {
                                return Permission.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('permission', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
