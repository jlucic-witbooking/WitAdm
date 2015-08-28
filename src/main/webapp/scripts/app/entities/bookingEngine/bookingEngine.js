'use strict';

angular.module('witadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('bookingEngine', {
                parent: 'entity',
                url: '/bookingEngines',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.bookingEngine.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/bookingEngine/bookingEngines.html',
                        controller: 'BookingEngineController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('bookingEngine');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('bookingEngine.detail', {
                parent: 'entity',
                url: '/bookingEngine/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'witadminApp.bookingEngine.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/bookingEngine/bookingEngine-detail.html',
                        controller: 'BookingEngineDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('bookingEngine');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'BookingEngine', function($stateParams, BookingEngine) {
                        return BookingEngine.get({id : $stateParams.id});
                    }]
                }
            })
            .state('bookingEngine.new', {
                parent: 'bookingEngine',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/bookingEngine/bookingEngine-dialog.html',
                        controller: 'BookingEngineDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {ticker: null, name: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('bookingEngine', null, { reload: true });
                    }, function() {
                        $state.go('bookingEngine');
                    })
                }]
            })
            .state('bookingEngine.edit', {
                parent: 'bookingEngine',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/bookingEngine/bookingEngine-dialog.html',
                        controller: 'BookingEngineDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['BookingEngine', function(BookingEngine) {
                                return BookingEngine.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('bookingEngine', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
