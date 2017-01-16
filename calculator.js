$(function(){
	var $allButtons = $("span");
	var $result = $("#result p");
	var $clearButton = $("#clear");
	var equalTapped = false;
	
	//Clear button
	$clearButton.on("click", function(){
		$result.text('');
	});
	//All buttons
	$allButtons.each(function(){
		var $this = $(this);
		if($this.text() === "="){
			$this.on("click", function(){
				calculateResult($this);
			});
		}else{
			$this.on("click", function(){
				addValue($this);
			
//				if($result.text() === ""){
//					addValue($this);	
//				}else{
//					$result.text("");
//					addValue($this);
//				}
			});
		}
	});
	
	
	
	function calculateResult(value){
		var oldText = $result.text();
		$result.text(eval(oldText));
		equalTapped = true;
	}

	function addValue(value){
		var oldText = $result.text();
		if(value.text() === "+"){
			$result.text(oldText + "+");
			equalTapped = false;
		}else if(value.text() === "-"){
			$result.text(oldText + "-");
			equalTapped = false;			
		}else if(value.text() === "/"){
			$result.text(oldText + "/");
			equalTapped = false;			
		}else if(value.text() === "x"){
			$result.text(oldText + "*");
			equalTapped = false;			
		}else{
			if(equalTapped){
				$result.text(value.text());
				equalTapped = false;
			}else{
				$result.text(oldText + value.text());
			}
		}
	}
});

