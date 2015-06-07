var selfquizCtrl = angular.module("selfquizCtrl", []);

selfquizCtrl.controller("quizCtrl",['$scope', '$http', function($scope, $http)
{

    // Load Question templates
    $scope.q_templates = [];
    $http.get("json/q_templates.index.json?t=" + String((new Date()).getTime()))
    .success(function(data, status)
    {
        $scope.q_templates = data;
    })
    .error(function(data, status)
    {
        writeErrorMessage("mainView", status, "Templates list could not be loaded. " + data + ". Please reload this page (F5) and try again.");
    });

    $scope.restart = function()
    {
        $scope.curr = 0;
        $scope.shuffle = shuffle; // See app.js
        $scope.points = 0;
        $scope.answer = "";
        $scope.msgType = 0;
        $scope.state = 1;
        // New question data
        $scope.newQuestion = "";
        $scope.newChoices = "";
        $scope.newAnswers = "";
        // Shuffle items
        if ($scope.items)
        {
            $scope.shuffleItems($scope.items);
        }
        else
        {
            $scope.items = [];
        }
    };
    $scope.restart();

    // Question Template loader/unloader
    $scope.loadItems = function(href)
    {
        $http.get(href)
        .success(function(data, status)
        {
            // Shuffle first
            data = $scope.shuffleItems(data);
            angular.forEach(data, function(item)
            {
                $scope.items.push(item);
            });
        })
        .error(function(data, status)
        {
            writeErrorMessage("mainView", status, "Could not load questions from \"" + href + "\". " + data + ". Please reload this page (F5) and try again.");
        });
    };

    $scope.unloadItems = function()
    {
        if (confirm("Are you sure you want to remove all current items?"))
        {
            $scope.items = [];
        }
    };

    $scope.shuffleItems = function(data)
    {
        data = shuffle(data);
        angular.forEach(data, function(i)
        {
            i.choices = shuffle(i.choices);
        });
        return data;
    };

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

    // Try to match user's answers with correct answers
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

    // Add a new item from newQuestion fields
    $scope.addQuestion = function()
    {
        var newQ = { "question": $scope.newQuestion,
                     "choices": $scope.newChoices,
                     "answers": $scope.newAnswers
                   };
        $scope.items.push(newQ);
        // Reset New question data
        $scope.newQuestion = "";
        $scope.newChoices = "";
        $scope.newAnswers = "";
    };

    // Remove an item
    // args: - i (the item to remove)
    $scope.removeQuestion = function(i)
    {
        var index = $scope.items.lastIndexOf(i);
        $scope.items.splice(index, 1);
    };

    $scope.next = function()
    {
        if ($scope.state != 2 || $scope.curr >= $scope.items.length - 1)
        {
            if ($scope.state == 1)
            {
                // Before starting quiz, convert choices and answers into arrays
                angular.forEach($scope.items, function(item)
                {
                    item.choices = item.choices.toString().replace(", ",",").split(",");
                    item.answers = item.answers.toString().replace(", ",",").split(",");
                    if (item.choices[0].replace(" ","")==="")
                    {
                        item.choices = [ ];
                    }
                    if (item.answers[0].replace(" ","")==="")
                    {
                        item.answers = [ ];
                    }
                });
            }
            $scope.state += 1;
        }
        else
        {
            $scope.curr += 1;
            $scope.answer = "";
            $scope.msgType = 0;
        }
    };
}]);

selfquizCtrl.controller("stdCtrl",[function()
{

}]);
