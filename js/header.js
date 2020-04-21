$(document).ready(function(){

	$('.overlay-total').on('click',function(e){
		e.preventDefault();
		removeoverlay();
	});

	$('.overlay-header').on('click',function(e){
		e.preventDefault();
		removeoverlay();
		searchAjaxRequest && searchAjaxRequest.abort();
	});
	var isUserMenuOpened = false;
	$('header .link_user').on('click',function(e){
		e.preventDefault();
		 $('#global header .header_icon_alert').removeClass('active');
		 $('#global header .header_icon_invoice').removeClass('active');
		 $('.header_compte_block_alertes').slideUp(0,function(){
			$(this).removeAttr('style');
		 });
		 $('.header_compte_block_contrat').slideUp(0,function(){
				$(this).removeAttr('style');
		 });
		 $('.header_compte_menu').stop(true,true).slideToggle(250);
		 $('.header_compte_block i').toggleClass('icon-acc-arrow-down');
		 $('.header_compte_block i').toggleClass('icon-acc-arrow-up');
		 $('#global header .header_compte_block').toggleClass('active');
		 if(!isUserMenuOpened) {
			 setTimeout(function(){
				 var userMenuTopPosition = $(".header_compte_menu").position().top;
				 var userMenuHeight = $(".header_compte_menu").height();
				 var userMenuScroll = window.innerHeight - userMenuTopPosition;
				 if(userMenuHeight>userMenuScroll) {
					 initMainMenuScroller(".header_compte_menu", userMenuTopPosition);
				 }
			 },500);
		 }
		 isUserMenuOpened = true;
	});

	$(document).on('click',function(e){
		var targetEle = e.target;
		var parentEle = $(targetEle).parents('.header_compte');
		if(parentEle.length !=1 ) {
			$('.header_compte_menu').hide();
			 $('#global header .header_compte_block').removeClass('active');
			 $('#global header .header_icon_alert').removeClass('active');
			 $('#global header .header_icon_invoice').removeClass('active');
			 $('.header_compte_block i').removeClass('icon-acc-arrow-down').addClass('icon-acc-arrow-up');
			 $('.header_compte_block_alertes').hide(0,function(){
					$(this).removeAttr('style');
			 });
			 $('.header_compte_block_contrat').hide(0,function(){
					$(this).removeAttr('style');
			 });
		}
	});


	


	
	//CLICK PICTO ALERTE
	$('.header_icon_alert').on('click', function(e) {
		e.preventDefault();
		$('.header_compte_menu').hide();
		 $('#global header .header_compte_block').removeClass('active');
		 $('#global header .header_icon_invoice').removeClass('active');
		 $('#global header .header_icon_alert').toggleClass('active');
		$(".header_compte_block_contrat").hide(0,'', function(){
           $('.header_compte_block_alertes').slideToggle(250);
		$('.header_search_block').css('z-index','0');
        });
	});
	//CLICK PICTO invoice
	$('.header_icon_invoice').on('click', function(e) {
		e.preventDefault();
		$('.header_compte_menu').hide();
		 $('#global header .header_compte_block').removeClass('active');
		 $('#global header .header_icon_alert').removeClass('active');
		 $('#global header .header_icon_invoice').toggleClass('active');
		$(".header_compte_block_alertes").hide(0,'', function(){
			$('.header_compte_block_contrat').slideToggle(250);

			//overlay-total
        });
	});

	//CLICK AJOUTER LAYER RECHERCHE
	$('.show_layer').on('click',function(e){
		e.preventDefault();
		

		$('.layer_search').slideDown(250);
		$('.layer_result_search').hide();

		//overlay-total
		$('.show_layer').css({'z-index':999});
		$('.header_search_block').removeClass('header_search_block_gris').css({'z-index':999});
		$('.overlay-header').show();
		$('.header_search_block').removeClass('layer-only layer-with-result').addClass('layer-with-list');
		searchAjaxRequest && searchAjaxRequest.abort();
	});
	


	//CLICK SELECTEUR RECHERHCE
	$('.layer_search li a').on('click',function(e){
		e.preventDefault();

		$('.show_layer').attr('class','show_layer');
		$('.show_layer').addClass($(this).attr('data-elt'));

		$('.layer_search').slideUp(250);
		if($(window).width() > 641) $('.overlay-total').hide();

	
	});
	


	

	//FOCUS DANS LE CHAMPS DE RECHERHCE
	$('#input_search_header').on('focus',function(){
		$('.header_search_block').addClass('header_search_block_gris').css({'z-index':999});
		$('.layer_search').slideUp(250);
		if($('.overlay-header').is(':visible') && !$('.layer-with-result').is(':visible'))
			$('.header_search_block').removeClass('layer-with-list layer-with-result').addClass('layer-only');
		
	});

	//CLICK MENU BURGER MOBILE
	$('.menu_burger').on('click',function(){

		$('nav').animate({'left':0});
		$('.overlay-total').show();

	});

	//CLICK MENU BURGER MOBILE
	$('.search_mobile').on('click',function(){

		
		$('.header_search_block').css({'z-index':999});
		$('.header_search_block').animate({'height':46},'fast');
		$('.overlay-total').show();
		$('.header_search_block').show();

	});

});

function removeoverlay(){

	//suppression des balises styles sur tous les elements suseptible de passer en z-index 999
	$('.header_compte_alerte').removeAttr('style');
	$('.header_compte_contrat').removeAttr('style');
	$('.header_search_block').removeAttr('style');
	$('.show_layer').removeAttr('style');

	if($(window).width() < 1025){
		$('nav').animate({'left':'-276px'},'fast');
		$('nav ol:visible').slideUp('fast',function(){
			$('nav .open').removeClass('close-total');
		});

	}

	//on masque les elements
	//LAYER ALERTES HEADER
	$('.header_compte_block_alertes').slideUp(250,function(){
		$(this).removeAttr('style');
	});
	//LAYER CONTRATS HEADER
	$('.header_compte_block_contrat').slideUp(250,function(){
		$(this).removeAttr('style');
	});
	//LAYER LAYER RECHERCHE
	$('.layer_search').slideUp(250,function(){
		$(this).removeAttr('style');
		$('.header_search_block').removeClass('header_search_block_gris').removeAttr('style');
	});
	//LAYER RESULTAT DE RECHERCHE
	$('.layer_result_search').hide();
	$('.overlay-header').hide();
	//ON MASQUE L overlay-total
	$('.overlay-total').hide();
	
	$('.header_search_block').removeClass('layer-with-list layer-with-result layer-only');

}