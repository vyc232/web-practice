$(function(){
	var map = {
		"car": "automobile",
		"kid": "small human"	  
	};
	var questionsArray = ["car", "kid"];
	
	//Creating Quiz portion
	var $quizInput = $("#quizInput");	
	var $inputList = $("#inputList");
	var $createQuiz = $("#createQuiz");
	var $newQuestionForm = $("#newQuestionForm");
	var $question = $("#question");
	var $answer = $("#answer");
	var $noInput = $("#no-input");
	
	//Taking Quiz portion
	var $doQuiz = $("#doQuiz");
	var $takeQuiz = $("#takeQuiz");
	var $questionList = $("#questionList");

	updateAddingCount();
	
	$createQuiz.show();
	$newQuestionForm.hide();
	$doQuiz.hide();
	
	$("#createQuizButton").on("click", function(){
		$createQuiz.hide();
		$newQuestionForm.show();
		$question.focus();
	});
	
	$("#takeQuizButton").on("click", function(){
		$quizInput.hide();
		$createQuiz.hide();
		$takeQuiz.hide();
		$("#doQuiz").show();
		$questionList.hide();
		transferQAndA();
		buildTakeQuiz();
		console.log("RUNNING QUIZ");
		runQuiz();
	});
	
	// Driver for the quiz taking
	function runQuiz(){
		var $answerBox = $("#answerbox");
		var $wrongAnswer = $("#wrong-answer");		
	}
	
	function buildTakeQuiz(){
		for(i = 0; i < questionsArray.length; i++){
			// Wrap every question box with a div
			var $answerDiv = $doQuiz.append("<div class=\"answerwrapper\"></div>")
			$answerDiv.append(questionsArray[i]);
			// The answer form
			$answerDiv.append("<form id=\"answerForm\"><input type=\"text\" id=\"answerbox\" placeholder=\"Answer\"><input type=\"submit\" id=\"answerQuestion\" value=\"Check Answer\"></form>");				
		}
		updateSubtractingCount();
	}

	
//	Show the first question, when the user hits answer and its correct, then replace the question with a new one
	
	
	
		
	$newQuestionForm.on("submit", function(e){
		e.preventDefault();
		var noQuestion, noAnswer;
		if(noInputCheck($question)){
			noQuestion = true;
			$noInput.text("No Question Input");
		}
		if(noInputCheck($answer)){
			noAnswer = true;
			$noInput.text("No Answer Input");
		}
		if(noQuestion && noAnswer){
			$noInput.text("No Question and Answer Input");
		}
		if(noQuestion){
			$question.focus();
		}else if(noAnswer){
			$answer.focus();
		}
		if(!noQuestion && !noAnswer){
			var questionText = $question.val();
			var answerText = $answer.val();
			console.log("question: " + questionText + " answer: " + answerText);
			// Display the added question/answer
			$inputList.append("<li><p id=\"question\">" + questionText + "</p><p id=\"answer\">" + answerText + "</p></li>");
			// Add the key/value pair to the map
			map.questionText = answerText;
			// Add the question to the questionArray
			questionsArray.push(questionText);
			$question.val("");
			$answer.val("");
			updateAddingCount();
			$question.focus();			
		}
	});
	
	//Removes input error text on keydown
	$newQuestionForm.on("keydown", function(){
		$noInput.text("");
	});
	
	//Returns true for no input, false if there is
	function noInputCheck(form, errorText){
		if(form.val().length === 0){
			return true;
		}
	}
	
		
	// Used when the quiz is being built 
	function updateAddingCount(){
		var count = $inputList.children().length;
		$("#questionCounter").text(count);
	}
		
	// Used when the quiz is being taken
	function updateSubtractingCount(){
		var count = $questionList.children().length;
		$("#questionsLeftCounter").text(count);		
	}
	
	// Loop through all the li of the inputted list and add them into the question list
	// Possibly can remove this later, but separates the input from the used set
	function transferQAndA(){
		$inputList.children().each(function(){
			$questionList.append($(this));
		});
		console.log("showing $questionList")
		$questionList.children().each(function(){
			console.log($(this).text());
		});
	}

		
});

