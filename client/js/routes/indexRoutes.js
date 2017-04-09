(function(){
    'use strict'
    app.config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {
        $stateProvider    
        .state("login", {
            url: '/',
            templateUrl : "../paginas/chat/index.html",
            controller: 'ChatCtrl',
            authorize: true
        })
        .state("login.formLogin", {
            templateUrl : "../paginas/index/login.html",
            authorize: false
        })
        .state("login.formForgot", {
            url: 'forgot',
            templateUrl : "../paginas/index/forgot.html",
            authorize: false
        })
        .state("new", {
            url: '/new/:id',
            templateUrl : "../paginas/index/newPassword.html",
            controller: 'UserCtrl',
            authorize: false
        })
        $urlRouterProvider
        .otherwise('/');
    }]);
})();




