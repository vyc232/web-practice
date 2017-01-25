// WHAT I LEARNED
// EVENT DELEGATION, CALLBACK FUNCTIONS, 

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
		for(var i = 0; i < questionsArray.length; i++){
			console.log("questionsArray[" + i + "]: " + questionsArray[i]);			
		}		
		console.log("RUNNING QUIZ");
		runQuiz();
	});

		
	function buildTakeQuiz(){
		for(var i = 0; i < questionsArray.length; i++){
			// Wrap every question box with a div
			var $answerDiv = $("<div class=\"answerWrapper\"></div>");
			$answerDiv.append("<p id=\"answerBoxQuestion\">" + questionsArray[i] + "</p>");
			// The answer form
			$answerDiv.append("<form class=\"answerForm\"><input type=\"text\" class=\"answerbox\" placeholder=\"Answer\"><input type=\"submit\" class=\"answerQuestion\" value=\"Check Answer\"></form>");
			$answerDiv.append("<p class=\"wrong-answer\"></p>");
			$doQuiz.append($answerDiv);
		}
		updateSubtractingCount();
	}
	
	// Driver for the quiz taking
	function runQuiz(){
		var $questionBoxes = $(".answerWrapper");		

		// SHOW ALL OF THE QUESTIONS AND HIDE WHEN THE QUESTION IS COMPLETED
		// OR HIDE AN INCORRECTLY ANSWERED QUESTION AND APPEND IT TO THE END
		$questionBoxes.on("submit", function(e){
			e.preventDefault();
			var $this = $(this);
			
			var answerBoxQuestion = $this.find("#answerBoxQuestion").text();
			console.log("Question: " + answerBoxQuestion);
			var $answerAttempt = $this.find(".answerbox");
			console.log("Answer Attempt: " + $answerAttempt.val());
			var correctAnswer = map[answerBoxQuestion];
			console.log("Correct Answer: " + correctAnswer);
			if($answerAttempt.val() === correctAnswer){
				console.log("Right Answer!!");
				$this.hide(); // OR POSSIBLY $this.remove()
			}else{
				$this.find(".wrong-answer").text("Wrong answer");
				console.log("Wrong answer!!");
				$answerAttempt.val("");
				$answerAttempt.focus();
			}
			
			//Removes wrong answer text on keydown
			$this.find(".answerForm").on("keydown", function(){
				$this.find(".wrong-answer").text("");
			});	
		});

	}

		
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
	}

		
});
