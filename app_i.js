var myApp = angular.module('myApp', ['firebase', 'ui.router']);

myApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: 'partials/i_list.html',
        controller: 'MyController'

    })
        .state('home.itemId', {
        url: '/:itemId',
        templateUrl: 'partials/i_part.html',
        controller: 'MyController'

    })
    .state('about',{
        url: '/about',
        views: {
            'about': {
                templateUrl: 'i_feed.html',
                controller: 'DataController'

            }
        }

    })
}]);
myApp.controller("MyController", ["$scope", "$firebaseArray","$stateParams", function($scope, $firebaseArray,$stateParams) {

    var ref = new Firebase('https://simpleform.firebaseio.com/saskatoon');
    $scope.saskatoon = $firebaseArray(ref);

    $scope.recordOrder = 'name';
    $scope.id = $stateParams.itemId;

    $(".element").typed({
//            strings: ["First sentence.", "Second sentence.", "Third sentence.", "Fourth sentence.", "Fif sentence."],
            typeSpeed: 0,
            showCursor: true
    });

}]);

myApp.controller("DataController", ['$scope', '$firebaseArray', '$stateParams', function($scope, $firebaseArray, $stateParams) {
    var nref = new Firebase('https://simpleform.firebaseio.com/catalogue');
    $scope.catalogue = $firebaseArray(nref);
    $scope.addItem = function() {
        $scope.catalogue.$add({
            title: $scope.title,
            category: $scope.category,
            location: $scope.location,
            notes: $scope.notes
        });
        $scope.title = "";
        $scope.category = "";
        $scope.location = "";
        $scope.notes = "";
    };
//$scope.removeItem = function() {
//    $scope.catalogue.$remove();
//}
}]);



//$scope.addMessage = function() {
//    // $add on a synchronized array is like Array.push() except it saves to Firebase!
//    $scope.messages.$add({
//        from: $scope.user,
//        content: $scope.message,
//        timestamp: Firebase.ServerValue.TIMESTAMP
//    });
//
//    $scope.message = "";
//};
