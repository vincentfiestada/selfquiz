var selfquizCtrl = angular.module("selfquizCtrl", []);

selfquizCtrl.controller("quizCtrl",['$scope', '$http', function($scope, $http)
{
    $scope.items = [];
    // Get quiz items
    $http({
        url: "json/items.json?d=" + String((new Date()).getTime()),
        method:"GET"
    }).success(function(data, status)
    {
        $scope.items = shuffle(data);
        // Shuffly choices too
        angular.forEach($scope.items, function(x)
        {
            x.choices = shuffle(x.choices);
        });
    }).error(function(data, status)
    {
        writeErrorMessage("quiz_stage", status, data);
    });

    $scope.curr = 0;

    $scope.shuffle = shuffle; // See app.js

    $scope.points = 0;

    $scope.answer = "";

    $scope.msgType = 0;

    $scope.chooseAnswer = function(a)
    {
        $scope.answer = a;
    };

    $scope.check = function()
    {
        // Get current question & answer(s)
        var correct_answers = $scope.items[$scope.curr].answers;
        var answer = $scope.answer.toLowerCase();

        if (isCorrect(correct_answers, answer))
        {
            $scope.points += 1;
            $scope.msgType = 1;
        }
        else
        {
            $scope.msgType = 2;
        }

    };

    var isCorrect = function(correct_answers, answer)
    {
        for (var i = 0; i < correct_answers.length; i++)
        {
            if (correct_answers[i].toLowerCase() == answer)
            {
                return true;
            }
        }
        return false;
    };

    $scope.next = function()
    {
        $scope.curr += 1;
        $scope.answer = "";
        $scope.msgType = 0;
    }
}]);

selfquizCtrl.controller("stdCtrl",[function()
{

}]);
