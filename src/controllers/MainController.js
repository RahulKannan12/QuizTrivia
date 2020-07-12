app.controller('MainController', function ($scope, $http) {
  $scope.welcomeMessage = "";
  $scope.streakCount = 0;
  let information = {};
  $scope.correctAnswer = "";
  $scope.blockAnswer = false;

  $scope.questionRefresh = function () {
    $scope.resultTab = false;
    $scope.blockAnswer = false;
    $scope.Result = "";
    $scope.correctAnswer = "";
    $http({
      method: 'GET',
      url: 'http://jservice.io/api/random'
    }).then(function successCallback(response) {
      $scope.welcomeMessage = response.data[0];
      $scope.formattedURL = 'https://api.datamuse.com/words?ml=' + $scope.welcomeMessage.answer;
      $http({
        method: 'GET',
        url: $scope.formattedURL
      }).then(function successCallback(response) {
        $scope.relatedWords1 = response.data[0].word;
        $scope.relatedWords2 = response.data[1].word;
        $scope.relatedWords3 = response.data[2].word;
        information = {
          questions: [$scope.welcomeMessage.answer, $scope.relatedWords1, $scope.relatedWords2, $scope.relatedWords3],
          answer: $scope.welcomeMessage.answer,
        }
        $scope.questionsFinal = randomizeArray(information.questions);
      })
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

  $scope.questionRefresh();
  let randomizeArray = (arr) => {
    let Question = [],
      till = arr.length;
    while (Question.length != till) {
      if (arr.length === 1) {
        Question[Question.length] = arr.splice(0, 1)[0];
      } else {
        let random = Math.floor(Math.random() * (arr.length));
        Question[Question.length] = arr.splice(random, 1)[0];
      }
    }
    return Question;
  }

  $scope.checkAnswer = function (type) {
    if ($scope.questionsFinal[type] === information.answer) {
      $scope.resultTab = true;
      $scope.Result = "Correct!!"
      $scope.streakCount = $scope.streakCount + 1; 
      $scope.blockAnswer = true;     
    } else {
      $scope.resultTab = true;
      $scope.Result = "Wrong!!"
      $scope.streakCount = 0;
      $scope.correctAnswer = information.answer;
      $scope.blockAnswer = true;
    }
  }
  $scope.nextQuestion = function(){
    $scope.questionRefresh();
  }
});

app.filter('capitalize', function () {
  return function (input) {
    return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
  }
});