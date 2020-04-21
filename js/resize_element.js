$(document).ready(function(){
	nav_container_height();
});
var resizeIdGlobal;
$(window).resize(function() {
	clearTimeout(resizeIdGlobal);
	resizeIdGlobal = setTimeout(nav_container_height, 200);
	var windowWidth = window.innerWidth;
	if(windowWidth > 1025 || windowWidth < 676) { // Condition applied for tablet view.
		$('#nav-child-list-container').hide(); 
		$('.nav-tablette a.open').removeClass('submenu-selected');
	}
});
function nav_container_height() {
	if($('.dockbar-admin').data()){
		var getTop = ($(window).width() <= 675) ? "47px" : "120px";
		$('.nav-bar-global').css({top:getTop});
	}
	var getMinHeight = window.innerHeight-((($('.nav-bar-global').length != 0) && $('.nav-bar-global').position().top) || 80);
	var ele = document.querySelectorAll("#container .content") || "";
	var bottomValue = 50;
	if(ele.length != 0) {
		var style = window.getComputedStyle(ele[0]);
		bottomValue = (style && (Number((style.marginBottom).split(/([0-9]+)/).filter(Number).join()) || 50)) || 50;
	}
	var containerHeight = getMinHeight - bottomValue;
	$('#container').css({'min-height':containerHeight + "px"}); 
	$('.nav-bar-global').css({'min-height':getMinHeight +"px"});
	$('.nav-tablette').css({'min-height':getMinHeight +"px"});
	$('#nav-child-list-container').css({'min-height':getMinHeight +"px"});
}