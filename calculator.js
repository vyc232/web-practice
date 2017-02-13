$(function () {
	var $allButtons = $("span");
	var $result = $("#result p");
	var $clearButton = $("#clear");
	var equalTapped = false;

	//Clear button
	$clearButton.on("click", function () {
		$result.text('');
		removeOperatorHighlight();
	});
	//All buttons
	$allButtons.each(function () {
		var $this = $(this);
		if ($this.text() === "=") {
			$this.on("click", function () {
				calculateResult($this);
			});
		} else {
			$this.on("click", function () {
				var oldText = $result.text();
				addValue($this);
			});
		}
	});
	//Compute the result of the input
	function calculateResult(value) {
		var oldText = $result.text();
		$result.text(eval(oldText));
		equalTapped = true;
	}
	//Adds value to the result text
	function addValue(value) {
		var oldText = $result.text();
		var lastChar = oldText.charAt(oldText.length - 1);
		if (value.text() === "+") {
			removeOperatorHighlight();
			operatorHighlight(value);
			if(oldText !== ""){
				printOperator("+", lastChar, oldText);
			}
			equalTapped = false;
		} else if (value.text() === "-") {
			removeOperatorHighlight();			
			operatorHighlight(value);
			if(oldText !== ""){
				printOperator("-", lastChar, oldText);
			}
			equalTapped = false;
		} else if (value.text() === "/") {
			removeOperatorHighlight();			
			operatorHighlight(value);
			if(oldText !== ""){
				printOperator("/", lastChar, oldText);
			}
			equalTapped = false;
		} else if (value.text() === "*") {
			removeOperatorHighlight();			
			operatorHighlight(value);
			if(oldText !== ""){
				printOperator("*", lastChar, oldText);
			}
			equalTapped = false;
		} else {
			removeOperatorHighlight();			
			if (equalTapped) {
				$result.text(value.text());
				equalTapped = false;
			} else {
				$result.text(oldText + value.text());
			}
		}
	}
	//Prints the operator if no previous operator
	function printOperator(operator, lastChar, oldText){
		if(checkOperator(lastChar)){
			var withoutPrevOperator = oldText.substring(0, oldText.length - 1);
			$result.text(withoutPrevOperator + operator);						
		}else{
			$result.text(oldText + operator);
		}		
	}
	//Returns true if the char is an operator
	function checkOperator(lastChar){
		if(lastChar === "+" || lastChar === "-" || lastChar === "/" || lastChar === "*")
			return true;
		return false;
	}
	//Hightlights the clicked operator
	function operatorHighlight(value){
		value.css({"border": "2px solid black"});
	}
	//Removes the highlighting of the chosen operator
	function removeOperatorHighlight(){
		var $operators = $(".operator");
		$operators.each(function(){
			$(this).css({"border": "1px solid grey"});
		});
	}
});