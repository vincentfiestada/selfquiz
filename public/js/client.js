var selfquiz = angular.module('selfquiz', ['ui.router', 'ngMaterial', 'selfquizCtrl', 'selfquizFilters']);

selfquiz.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider)
{
	// Redirects
	$urlRouterProvider.otherwise("/");
    // States
    $stateProvider
	.state('quiz', {
		url: "/",
		templateUrl: "p/partials/quiz.html",
		controller: 'quizCtrl'
	});
}]);

/* Utility Functions */
var _ = function(el){ return document.getElementById(el.toString()); };
var writeErrorMessage = function(id, errorcode, message)
{
    var toAppend = "<section class=\"error\"><h2>Oops! Error " + errorcode.toString() + "</h2><p>" + message.toString() + "</p><p><a href=\"https://github.com/vincentfiestada/rsushs/issues\" target=\"_blank\"><button>Report an issue</button></a></p></section>";
	_(id).innerHTML = toAppend;
};
/* Array Shuffle function from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
var shuffle = function(array)
{
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
