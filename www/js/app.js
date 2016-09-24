// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

// .run(function($rootScope) {
  
//   //show/hide html element based on login

//   $rootScope.checkLoggedIn = function()
//   {
//     return $rootScope.is_loggedin !== null;
//   }

// })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.postlists', {
      url: '/postlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/postlists.html',
          controller: 'PostListsCtrl'
        }
      }
    })

    .state('app.medialists', {
      url: '/medialists',
      views: {
        'menuContent': {
          templateUrl: 'templates/medialists.html',
          controller: 'MediaCtrl'
        }
      }
    })

    .state('app.posts', {
      url: '/posts',
      views: {
        'menuContent': {
          templateUrl: 'templates/posts.html',
          controller: 'PostsCtrl'
        }
      }
    })

    .state('app.post', {
      url: '/posts/:postId',
      views: {
        'menuContent': {
          templateUrl: 'templates/post.html',
          controller: 'SinglePostCtrl'
        }
      }
    })

    .state('app.singlepost', {
      url: '/posts/single/:postId',
      views: {
        'menuContent': {
          templateUrl: 'templates/singlepost.html',
          controller: 'SinglePostCtrl'
        }
      }
    })

    .state('app.uploadmedia', {
      url: '/uploadmedia',
      views: {
        'menuContent': {
          templateUrl: 'templates/uploadmedia.html',
          controller: 'UploadMediaCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/postlists');
});
