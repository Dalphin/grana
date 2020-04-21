$(document).ready(function(){
	var targets = {
			"target-blank" : "_blank",
            "target-self" : "_self",
            "target-top" : "_top",
            "target-parent" : "_parent"
	};
	
	$.each(targets, function(cssClass, targetValue){
		$('.journal-content-article a.'+cssClass).each(function(){
			$(this).attr('target' , targetValue);
		});
	});
});