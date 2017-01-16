$(function(){
	var $list = $("ul");
	var $newItemForm = $("#newItemForm");
	
	$newItemForm.on("submit", function(e){
		e.preventDefault();
		var $newListItem = $("#itemDescription");
		var text = $newListItem.val();
		if(text.length === 0){
			if(!$("#no-input").length){
				var $noInput = $("<p id=\"no-input\">No Input!</p>");
				$newItemForm.append($noInput);
				$newListItem.focus();
				return false;				
			}else{
				$newListItem.focus();
				return false;
			}	
		}
		$list.append("<li>" + text + "</li>");
		$newListItem.val('');
		$newListItem.focus();
	});
	
	$newItemForm.on("keydown", function(){
		var $noInput = $("#no-input");
		$noInput.remove();
	});
	
	$list.on("click", "li", function(){
		var $this = $(this);
		$this.remove();
	});
	
});



