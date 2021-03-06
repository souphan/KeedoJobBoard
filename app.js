var blocJobs = angular.module('blocJobs', ["ui.router", "firebase", "jcs-autoValidate", "ui.bootstrap"]);
// FORM VALIDATION CUSTOM MESSAGES
blocJobs.run(function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['jobTitle'] = 'Job title can only contain numbers and letters';
        errorMessages['companyName'] = 'Company name can only contain numbers and letters';
        errorMessages['jobDescription'] = 'Please enter a URL, or description of job';
        errorMessages['postalCode'] = 'Please enter a valid postal code';
    })       
});

blocJobs.config(function($stateProvider, $urlRouterProvider){
    
    // FOR ANY UNMATCHED URL SEND TO /landing
    $urlRouterProvider.otherwise("/")

    $stateProvider
    .state('landing', {
         url: '/',
         controller: 'mainCtrl',
         templateUrl: 'landing.html'
     })
    .state('job-post', {
        url: "/job-post",
        controller: 'jobPostCtrl',
        templateUrl: "job-post.html"
    })
    .state('postings', {
        url: "/postings",
        controller: 'postingsCtrl',
        templateUrl: "postings.html"
    })
})

// RE-USABLE FACTORY THAT GENERATES THE $firebaseAuth INSTANCE
blocJobs.factory("Auth", function($firebaseAuth) {
  var ref = new Firebase("https://keodo-todo-list.firebaseio.com");
  return $firebaseAuth(ref);
});

// FILTER JOBS USING PAGINATION BY SLICING THROUGH INDEX
blocJobs.filter('startFrom', function() {
    return function(data, start){
        return data.slice(start);
    }
});

// navi-menu DIRECTIVE USED FOR EACH TEMPLATE
blocJobs.directive("naviMenu", function() {
    return {
        template: '<nav class="navbar"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" ui-sref="landing">BLOC</a></div><ul class="nav navbar-nav"><li><a class="navbar-front" href="#">Frontend Web Development</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="">Roadmaps <span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#">Page 1-1</a></li><li><a href="#">Page 1-2</a></li><li><a href="#">Page 1-3</a></li></ul></li><li><a class="navbar-mess" href="#">Messages</a></li><li><a class="navbar-sched" href="#">Schedule</a></li><li><a class="navbar-acc" href="#"><span class="glyphicon"></span> Account</a></li><li><a class="navbar-log" href="#" ng-click="login()" ng-hide="authData"><span class="glyphicon"></span>Log in</a><a class="navbar-log" href="#" ng-click="logout()" id="log-out" ng-show="authData"><span class="glyphicon"></span>Log out</a></li></ul></div></nav>'
    }
});
