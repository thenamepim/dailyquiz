var score = 0; //set score to 0
var total = 2; //total number of questions
var point = 1; //points per correct answer
var topScore = total * point; //highest possible score
var allQuestions = getQuizQuestions(); //store all questions in variable

//Initializer
function init() {
  for (i = 0; i < allQuestions.length; i++) {
    sessionStorage.setItem("a" + (i+1) + "", allQuestions[i].correctAnswer)
  }
}

$(document).ready(function() {
  //hide all questions
  $('.questionForm').hide();

  //set first quiz question
  setQuizQuestion(1);

  //show question 1
  $("#q1").show();

  $('.questionForm #submit').click(function() {
    //get data attributes
    current = $(this).parents("form:first").data("question");
    next = $(this).parents("form:first").data("question")+1;

    //hide all questions
    $(".questionForm").hide();   

    //set & fade in next question only process if it's the last question 
    if(current == total) {
      process("" + current + "");
    } else {
        setQuizQuestion(next);
        $("#q" + next + "").fadeIn(300);
        process("" + current + "");
    }
    return false;
  })
});

//process the answers
function process(n) {

  //get input value
  var submitted = $("input[name=q" + n + "]:checked").val();
  if(submitted == sessionStorage.getItem("a" + n + "")) {
    score = score + point;
  }

  if(n == total) {
    $("#results").html("<h3> Your final score is: " + score + " out of " + topScore + ".</h3><a href='index.html'>Take quiz again</a>");
  } 
  return false;
}

//add event listener
window.addEventListener('load', init(), false);

//returns a quiz question with answer options based on the nth question a users wants to answer
function setQuizQuestion(nthQuestion) {
  var quizQuestion = document.querySelector(".question" + nthQuestion + "");
  quizQuestion.textContent = nthQuestion + ". " + allQuestions[nthQuestion-1].question;

  //set answer options
  var r = document.getElementsByTagName("label");
  r[nthQuestion * 4 -4].innerHTML = allQuestions[nthQuestion-1].answerA;
  r[nthQuestion * 4 -3].innerHTML = allQuestions[nthQuestion-1].answerB;
  r[nthQuestion * 4 -2].innerHTML = allQuestions[nthQuestion-1].answerC;
  r[nthQuestion * 4 -1].innerHTML = allQuestions[nthQuestion-1].answerD;
  return false;
}

//returns all the questions available for this specific quiz
function getQuizQuestions() {
  return allQuizQuestions = [
  {question: "How many followers does PewDiePie have?", answerA: "7 million", answerB: "32 million", answerC: "61 million", answerD: "89 million", correctAnswer: "C"},
  {question: "What is the biggest National Park in the United States?", answerA: "Wrangell-St. Elias", answerB: "Gates of the Arctic", answerC: "Denali", answerD: "Katmai", correctAnswer: "A"}
  ];
}
