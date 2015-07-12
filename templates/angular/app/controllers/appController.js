'use strict';

angular.module('myapp',
  ['myapp.galleries',
    'myapp.gallery',
    'ngNewRouter', 'ngAnimate', 'ngAria', 'ngMaterial'])
  .controller('appController', appController)
  .factory('_', function () { return _; })
  .config(materialConfig)
  .config(componentLoaderConfig)
  .run(runFunction);

//http://angular.github.io/router/
function appController($router) {
  $router.config([
    // todo - default path - '' is greedy!
    { path: '/', redirectTo: '/galleries' },
    { path: '/galleries', component: 'galleries' },
    { path: '/gallery/:id', component: 'gallery' },
    { path: '/gallery/:id/edit', component: 'editGallery' }
  ]);
}

function materialConfig($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('brown')
    .accentPalette('red');
}

function componentLoaderConfig($componentLoaderProvider) {
  $componentLoaderProvider.setTemplateMapping(function (name) {
    var dashName = name.replace(/([A-Z])/g, function ($1) { return '-' + $1.toLowerCase(); });
    // customized to use app prefix
    return './components/' + dashName + '/' + dashName + '.html';
  });
}

function runFunction($log) {
  $log.debug('initializing store');
}
