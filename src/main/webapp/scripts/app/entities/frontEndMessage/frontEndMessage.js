'use strict';

angular.module('witadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('frontEndMessage', {
                parent: 'entity',
                url: '/frontEndMessages',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.frontEndMessage.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/frontEndMessage/frontEndMessages.html',
                        controller: 'FrontEndMessageController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('frontEndMessage');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('frontEndMessage.detail', {
                parent: 'entity',
                url: '/frontEndMessage/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.frontEndMessage.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/frontEndMessage/frontEndMessage-detail.html',
                        controller: 'FrontEndMessageDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('frontEndMessage');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'FrontEndMessage', function($stateParams, FrontEndMessage) {
                        return FrontEndMessage.get({id : $stateParams.id});
                    }]
                }
            })
            .state('frontEndMessage.new', {
                parent: 'frontEndMessage',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/frontEndMessage/frontEndMessage-dialog.html',
                        controller: 'FrontEndMessageDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {username: null, editedName: null, description: null, title: null, position: null, type: null, hidden: null, unavailable: null, start: null, end: null, creation: null, lastModification: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('frontEndMessage', null, { reload: true });
                    }, function() {
                        $state.go('frontEndMessage');
                    })
                }]
            })
            .state('frontEndMessage.edit', {
                parent: 'frontEndMessage',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/frontEndMessage/frontEndMessage-dialog.html',
                        controller: 'FrontEndMessageDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['FrontEndMessage', function(FrontEndMessage) {
                                return FrontEndMessage.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('frontEndMessage', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
