$(document).ready(function(){
	$('nav .open').on('click',function(e){
		e.preventDefault();
		if(!$(this).next('ul').find('ol').is(':visible')){
			$('nav ol:visible').slideUp();
			$('nav .open').removeClass('close-total');
			$(this).next('ul').find('ol').slideDown();
			$(this).addClass('close-total');			
		}else{
			$(this).next('ul').find('ol').slideUp();
			$(this).removeClass('close-total');			
		}
	});
	$('.nav-tablette a.open').on('click',function() {
		var isSubmenuSelected = $(this).hasClass('submenu-selected');
		if(isSubmenuSelected) {
			$('#nav-child-list-container').hide();
			$('.nav-tablette a.open').removeClass('submenu-selected');
			return false;
		}
		$('.nav-tablette a.open').removeClass('submenu-selected');
		$(this).addClass('submenu-selected');
		var getChildMenu = $(this).next('ol.child-menu').clone(true);
		$('#nav-child-list-container').show().empty().append(getChildMenu);
		var position = $(this).position();
		document.querySelector('#nav-child-list-container ol').style.setProperty( 'margin-top', (position.top-1)+'px', 'important');
	});
	$(document).on('click', '#nav-child-list-container li.title_list a.list_item', function() {
		$('#nav-child-list-container').hide();
		$('.nav-tablette a.open').removeClass('submenu-selected');
	});
});