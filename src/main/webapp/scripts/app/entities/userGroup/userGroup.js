'use strict';

angular.module('witadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userGroup', {
                parent: 'entity',
                url: '/userGroups',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.userGroup.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userGroup/userGroups.html',
                        controller: 'UserGroupController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userGroup');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('userGroup.detail', {
                parent: 'entity',
                url: '/userGroup/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.userGroup.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userGroup/userGroup-detail.html',
                        controller: 'UserGroupDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userGroup');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'UserGroup', function($stateParams, UserGroup) {
                        return UserGroup.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userGroup.new', {
                parent: 'userGroup',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/userGroup/userGroup-dialog.html',
                        controller: 'UserGroupDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {name: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('userGroup', null, { reload: true });
                    }, function() {
                        $state.go('userGroup');
                    })
                }]
            })
            .state('userGroup.edit', {
                parent: 'userGroup',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/userGroup/userGroup-dialog.html',
                        controller: 'UserGroupDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserGroup', function(UserGroup) {
                                return UserGroup.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userGroup', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
