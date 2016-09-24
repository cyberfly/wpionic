angular.module('starter.controllers', ['base64'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, AuthService, $window, $rootScope, $cordovaToast) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  //logout function

  $scope.doLogout = function(){
    AuthService.clearCredentials();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // console.log('Doing login', $scope.loginData);

    AuthService.checkAuth($scope.loginData).then(function(response) {
        
        // console.log(response.data.data.status);
     
    }, function errorCallback(response) {

      // console.log($window.localStorage['is_loggedin']);

      //if wrong username password

      if (response.data.data.status=='401') {
          AuthService.clearCredentials();  
          $scope.closeLogin();
          $cordovaToast.show('You have been logged out', 'short', 'top');
      } 
      else if (response.data.data.status=='400') {
            
          //if correct login but cant create post (no title and content)
          AuthService.setCredentials($scope.loginData);
          $scope.closeLogin();
          $cordovaToast.show('You are now logged in as '+ $scope.loginData.username, 'short', 'top');
            
      };
        
    });

    
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);

  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.data = {
    showDelete: false
  };

})

.controller('PostListsCtrl', function($scope, $stateParams, PostsService) {

  PostsService.getPosts()
   .then(function(response) {
     $scope.posts = response;
   });

   $scope.doRefresh = function() {
      
      PostsService.getPosts()
     .then(function(response) {
       $scope.posts = response;
     });  

      $scope.$broadcast('scroll.refreshComplete')


    };



})

.controller('MediaCtrl', function($scope, $stateParams, MediaService) {

   $scope.doRefresh = function() {
      
      MediaService.getMedias()
     .then(function(response) {
       $scope.medias = response;
     });  

      $scope.$broadcast('scroll.refreshComplete')


    };

    $scope.doRefresh();



})

.controller('PostsCtrl', function($scope, $stateParams, PostsService, $ionicModal, $ionicPopup) {

  // PostsService.getPosts()
  //  .then(function(response) {
  //    $scope.posts = response;
  //  });

   

   $scope.doRefresh = function() {
      
      PostsService.getPosts()
     .then(function(response) {
       $scope.posts = response;
     });  

      $scope.$broadcast('scroll.refreshComplete')


    };

    $scope.doRefresh(); 

    $scope.edit = function(post) {
      alert('Edit Post: ' + post.id);
    };

    $scope.data = {
      showDelete: false
    };

    $scope.listCanSwipe = true;

    $scope.delete = function(post) {
      $scope.posts.splice($scope.posts.indexOf(post), 1);

      //called service to remove data from backend server

      PostsService.deletePost(post.id);

    };

    //create post

    // Form data for the login modal
    $scope.postData = {};

    $scope.createPost = function(){
        
        // console.log($scope.postData);

        //called service to post data to server

        // var result = PostsService.createPost($scope.postData);

        $scope.postData.status = 'publish';

        PostsService.createPost($scope.postData)
         .then(function(response) {
           // console.log(response);
           $scope.modal.hide();

           if (response.status=='201') {

              $scope.doRefresh();
              
              var alertPopup = $ionicPopup.alert({
                   title: 'Success',
                   template: 'New Post have been added to server'
                 });     
           };
         });  

        
    };


    //modal

    $ionicModal.fromTemplateUrl('templates/newpost.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    //or we can use mode.hide() on ng-click close button


})

.controller('SinglePostCtrl', function($scope, $stateParams, PostsService) {

   $scope.postId = $stateParams.postId;
   $scope.post = PostsService.getPost($scope.postId);

})

.controller('UploadMediaCtrl', function($scope, $cordovaCamera, MediaService) {

   $scope.openCamera = function()
   {
      
        
        var options = {
             fileKey: "avatar",
             fileName: "image.png",
             chunkedMode: "false",
             mimeType: "false",
             quality: 75,
             destinationType: Camera.DestinationType.FILE_URI,
             sourceType: Camera.PictureSourceType.CAMERA,
             allowEdit: true,
             encodingType: Camera.EncodingType.JPEG,
             targetWidth: 300,
             targetHeight: 300,
             popoverOptions: CameraPopoverOptions,
             saveToPhotoAlbum: true
           };

           document.addEventListener("deviceready", function () {
             
              $cordovaCamera.getPicture(options).then(function(imagePath) {
                $scope.imgURI = imagePath;
              }, function(err) {
                 console.log('error');
              }); 


           }, false);

    };

    $scope.openFileManager = function()
    {
       
         
         var options = {
              fileKey: "avatar",
              fileName: "image.png",
              chunkedMode: "false",
              mimeType: "false",
              quality: 75,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 300,
              targetHeight: 300,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false
            };

            document.addEventListener("deviceready", function () {
              
               $cordovaCamera.getPicture(options).then(function(imagePath) {
                $scope.imgURI = imagePath;
                   }, function(err) {
                    console.log('error');
                  }); 


            }, false);

     };

     $scope.uploadMedia = function()
     {
        MediaService.uploadMedia($scope.imgURI);
     };

})

//auth service

.service('AuthService', function($http, $base64, $window, $rootScope) { 

  return {
    checkAuth: function(loginData){

      //we post empty data to prevent post created if successfully authenticated
      //response data 400 bad request means we success login but cant create post because no data
      
      var _authdata = $base64.encode(loginData.username + ':' + loginData.password);

      var post_header = {
                'Authorization': 'Basic ' + _authdata,
                'Content-Type': 'application/x-www-form-urlencoded'              
                };

      return $http({
              method: 'POST',
              data:{},
              url: 'http://ionicbackend.integrasolid.com/wp-json/wp/v2/posts',
              headers: post_header
              });

    },
    setCredentials: function(loginData)
    {
      $window.localStorage['is_loggedin'] = 1;
      $window.localStorage['logged_username'] = loginData.username;

      $rootScope.is_loggedin = 1;
      $rootScope.logged_username = loginData.username;
    },
    clearCredentials: function()
    {
      $window.localStorage['is_loggedin'] = null;
      $window.localStorage['logged_username'] = null;

      $rootScope.is_loggedin = null;
      $rootScope.logged_username = null;
      
    },
    isLoggedin: function()
    {
      return $window.localStorage['is_loggedin'];
    }

  };

})

//post service

.service('PostsService', function($http, $base64, $httpParamSerializerJQLike) {  
 
 var posts = [];

 var _authdata = $base64.encode('ionicAPI' + ':' + 'i0n1C@dM1n');

 var json_header = {
                'Authorization': 'Basic ' + _authdata,
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'               
                };

 var post_header = {
                'Authorization': 'Basic ' + _authdata,
                'Content-Type': 'application/x-www-form-urlencoded'              
                };

 return {
   getPosts: function() {
     
     return $http.get('http://ionicbackend.integrasolid.com/wp-json/wp/v2/posts')
       .then(function (response) {
         posts = response.data;
         return response.data;
       });
   },
   getPost: function(postId) {
     
     // console.log(posts,233);

     return posts[postId];

   },
   deletePost: function(postId){

      return $http({
                method: 'DELETE',
                url: 'http://ionicbackend.integrasolid.com/wp-json/wp/v2/posts/'+postId,
                headers: json_header
                });

   },
   createPost: function(post){

    
      var data = $httpParamSerializerJQLike(post);
      

      return $http({
                method: 'POST',
                data:data,
                url: 'http://ionicbackend.integrasolid.com/wp-json/wp/v2/posts',
                headers: post_header
                });

   }
 };
})

.service('MediaService', function($http, $base64, $cordovaFileTransfer, $cordovaToast, $state) {

  var medias = [];

  return {
    getMedias: function() {
      
      return $http.get('http://ionicbackend.integrasolid.com/wp-json/wp/v2/media')
        .then(function (response) {
          medias = response.data;
          return response.data;
        });
    },
    uploadMedia: function(imagePath){

      authHeaderValue = function(username, password) {
          var tok = username + ':' + password;
          var hash = btoa(tok);
          return "Basic " + hash;
      };

      var headers = {'Authorization': authHeaderValue('ionicAPI', 'i0n1C@dM1n') };

      var options = {
           
          headers: headers,
       
      };


      $cordovaFileTransfer.upload('http://ionicbackend.integrasolid.com/wp-json/wp/v2/media', imagePath, options)
       
      .then(function(result) {
       
        $cordovaToast.show('Your file uploaded successfully', 'short', 'top');
       
        $state.go('app.medialists', {}, { reload: true });
       
        $window.location.reload(true);
       
      }, function(err) {
       
        $cordovaToast.show(err.message, 'short', 'bottom');
       
      });


    }
  };



})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
