(function($){
	$.fn.custom_select_krealid = function(){
		var z_index = 901;
		$(this).each(function(){
			z_index--;
			var inc = 0, option_length = $(this).find('option').length, custom_select_html = "";
			custom_select_html = '<div class="customSelect notactive" style="z-index:'+z_index+'">';
			custom_select_html += '<div class="select">'+$(this).find('option:selected').html()+'</div>';
			custom_select_html += '<div class="options">';

			$(this).find('option').each(function(){
				inc++;
				if(inc == 1) custom_select_html += '<div class="option first" data-elt="'+(inc-1)+'">'+$(this).html()+'</div>';
				else if(inc == option_length) custom_select_html += '<div class="option last" data-elt="'+(inc-1)+'">'+$(this).html()+'</div>';
				else custom_select_html += '<div class="option" data-elt="'+(inc-1)+'">'+$(this).html()+'</div>';

			});
			custom_select_html += '</div>';
			$(this).hide().after(custom_select_html);
		});

		$('.customSelect .select').on('click',function(){
			$(this).parent('.customSelect').removeClass('notactive').addClass('active');
			$(this).next('.options').slideDown('fast');
		});

		$('.customSelect .option').on('click',function(){
			$(this).parents('.customSelect').removeClass('active').addClass('notactive');
			$(this).parent('.options').slideUp('fast');
			$(this).parents('.customSelect').find('.select').html($(this).html());
			$(this).parents('.customSelect').prev('select').find('option').removeAttr("selected");
			$(this).parents('.customSelect').prev('select').find('option:eq('+$(this).attr('data-elt')+')').attr("selected", "selected");
			if($(this).parents('.customSelect').prev('select').attr("name") === "select-language-menu") {
				var optionUrl = $(this).parents('.customSelect').prev('select').find('option:eq('+$(this).attr('data-elt')+')').attr("value");
				location = optionUrl;
			}
		});

		$('.customSelect').on('mouseleave',function(){
			setTimeout(
				function(){
					$('.customSelect').each(function(){
						if(!$(this).is(":hover")){
							$(this).removeClass('active').addClass('notactive');
							$(this).find('.options').slideUp('fast');
						}
					});
				},1000
			);
		});
	};
})(jQuery);
