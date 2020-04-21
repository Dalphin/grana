var uapConfirmJsVersionCheck = "2.5.1";
$(document).ready(function(){
	$(".header_cog_dockbar").click(function(){
		$(".dockbar-admin").toggleClass("hide");
	});
	if ($("#image-cropper").length > 0){
		$('#image-cropper').cropit();
	}
	$('#themeSearchForm').submit(function() {
		var keywords = $('#keywords').val();
		var searchPortlet = $('#searchPortlet').val();
	    var portletId = $('#portletId').val();
	    window.location = searchPortlet + "&_"+ portletId +"_keywords=" + keywords;
	    return false;
	});
	$(".category-edit").click(function(e){
		e.preventDefault();
		window.location.href = $(this).data("href");
	});
	$(".add-to-cart-button").click(function(e){
		e.preventDefault();
		$.ajax({
			url:'/c/shopping/add-to-cart',
			data: 'itemid=' + $(this).data("itemid") + '&groupid=' + $(this).data("groupid") + '&carturl=' + encodeURIComponent($(this).data("carturl")) + "&quantity=" + $(this).closest(".global-button-quantity").find(".item-quantity").val(),
			type: 'POST',
			success: function(data) {
				$(".modal-body").html(data);
				$('#myModal').modal("show");
			}
		});
	});
	$(".remove-item-from-cart").click(function(e){
		e.preventDefault();
		$.ajax({
			url:'/c/shopping/remove-to-cart',
			data: 'itemid=' + $(this).data("itemid") + '&groupid=' + $(this).data("groupid"),
			type: 'POST',
			success: function() {
				location.reload();
			}
		});
	});
	$(".description-button").click(function(e) {
		e.preventDefault();
		$.ajax({
			url:'/c/shopping/show-item-description',
			data: 'itemid=' + $(this).data("itemid"),
			type: 'POST',
			success: function(data) {
				$(".modal-body").html(data);
				$('#myModal').modal("show");
			}
		});
	});
	// Auto-complete de la fonction search globale
	$("#keywords").keyup(function(){
		if($(this).val().length >= 3 ) {
			$.ajax({
				url:'/c/search/autocomplete',
				data: 'keywordsAutocomplete=' + $(this).val(),
				type: 'POST',
				success: function(data) {
					if(data != "") {
						$(".result_autocomplete").html(data);
						$('.header_search_block').addClass('header_search_block_gris').css({'z-index':999});
						$('.layer_search').slideUp(250);
						$('.layer_result_search').show();
					} else {
						$('.layer_result_search').hide();
					}
				},
				error: function() {
					$('.layer_result_search').hide();
				}
			});
		} else {
			$('.layer_result_search').hide();
		}
	});
	$(document).on('click', '.autocompleteclick', function(e){
		e.preventDefault();
		$("#keywords").val($(this).data("value"));
		$("#themeSearchForm").submit();
	});
	//Clique sur LANGUAGE
	$('#languageSettings').on('click',function(){
		$('.nav-mobile-language').css('display','block');
		$('#mainNavMenu').css('display','none');
	});
	if($('.dockbar-admin').data()){
       if ($(window).width() >= '675') {
        	$('header').css({top:"40px"});
       } else {
    	   	$('header').css({top:"8px"}); 
       }
       $(window).resize(function() {
    	   if ($(window).width() >= '675') {
    		   $('header').css({top:"40px"});
    	   } else {
    		   $('header').css({top:"8px"}); 
    	   }
       });
       $('#global').css({marginTop:"40px"});
       $('.nav-bar-global').css({top:"120px"});
       $('.nav-tablette').css({top:"120px"});
       $('#nav-child-list-container').css({top:"120px"});
	}
});