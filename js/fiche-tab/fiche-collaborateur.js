$(document).ready(function(){
	//gestion des onglets (desktop) --> afficher le bon contenu
	$('.tabs a').on('click',function(e){
		e.preventDefault();
		$(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
	});

	//gestion des onglets/select (mobile) --> afficher le bon contenu
	$('.mobile_tabs').on('change', function() {
	  	var tab = $(this).val();
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
	});

	//BTN ACTIONS
	$('.btn-action').on('click',function(){
		$('.block_liste_actions').show();
	});
	$('.block_liste_actions').on('mouseleave',function(){
		$(this).hide();
	});

	//CUSTOM SELECT JQUERY / POUR LE CHANGEMENT D ONGLET SUR MOBILE
	//$('.mobile_tabs').customSelect({customClass:'mobile_tabs_custom'});


	//MODIFICATION DES CHAMPS DANS LES ONGLETS
	$('.modif_input').on('click',function(e){
		e.preventDefault();
		var data = $(this).attr('data-elt');
		$('.valid_input.'+data).css('display','block');
		$(this).hide();
		$('input#'+data).removeClass('readonly').removeAttr('readonly').focus();
		$('textarea#'+data).removeClass('readonly').removeAttr('readonly').focus();
	});
	$('.valid_input').on('click',function(e){
		e.preventDefault();
		var data = $(this).attr('data-elt');
		$('.modif_input.'+data).css('display','block');
		$(this).hide();
		$('input#'+data).addClass('readonly').attr('readonly', 'readonly');
		$('textarea#'+data).addClass('readonly').attr('readonly', 'readonly');
	});

	//LAYER VEHICULE ASSO
	$('.link_layer_asso').on('click',function(e){
		e.preventDefault();
		marginLayerAsso();
		$('.layer_associe').css({'display':'block'});
		$('.overlay_asso').show();
	})

	$('.overlay_asso, .close_layer_asso').on('click',function(){
		$('.layer_associe').hide();
		$('.overlay_asso').hide();
	})

});

$(window).resize(function(){
	return;
})

function marginLayerAsso(){
	var marginLeft;
	var marginTop;
	if($(window).width() > 900) marginLeft = ($(window).width() - 900)/2;
	else marginLeft = 0;
	if($(window).height() > $('.layer_associe').height()) marginTop = ($(window).height() - $('.layer_associe').height())/2;
	else marginTop = 0;
	$('.layer_associe').css({'margin-left':marginLeft,'margin-top':marginTop});
}