$(function(){
	var map = {};
	var $inputList = $("ol#inputList");
	var $quizInput = $("#createQuiz");
	var $newQuizButton = $("#newQuizButton");
	var $newQuestionForm = $("#newQuestionForm");
	var $question = $("#question");
	var $answer = $("#answer");
	var $noInput = $("#no-input");
	
	function updateCount(){
		var count = $inputList.children().length;
		$("#questionCounter").text(count);
	}
	updateCount();
	
	$newQuizButton.show();
	$newQuestionForm.hide();
	
	$("#showQuizForm").on("click", function(){
		$newQuizButton.hide();
		$newQuestionForm.show();
		$question.focus();
	});
	
	$("#showTakeQuiz").on("click", function(){
		$quizInput.hide();
		$("#doQuiz").show();
	});
		
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
			$inputList.append("<li><p id=\"question\">" + questionText + "</p><p id=\"answer\">" + answerText + "</p></li>");
			map.questionText = answerText;
			$question.val("");
			$answer.val("");
			updateCount();
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
	

		
});


