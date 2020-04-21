$(document)
		.ready(
				function() {

					$("#language").change(function() {
						$.cookie("apiLang", $(this).val());
						$("form.language-selection").submit();
					});
					
					$('.liste-supports .content select').not('.mobile_tabs')
							.custom_select_krealid();
					$('.liste-cartes .content select').not('.mobile_tabs')
							.custom_select_krealid();

					$('.global_liste_cartes .btn-filtres').on(
							'click',
							function(e) {
								e.preventDefault();
								$('.overlay_filtre').show();
								$('.liste-cartes .block_filtres').show().css(
										'height', $(document).height())
										.animate({
											'left' : 0
										}, "fast");
								$('html, body').animate({
									scrollTop : 0
								}, 'fast');
							});

					// GESTION DES CHECKBOXES
					var tempoff = 0;
					$(".liste-cartes .row-order input:checkbox")
							.change(
									function() {
										if (tempoff == 0) {
											if (this.checked) {
												$(
														'.liste-cartes .row-carte input:checkbox')
														.screwDefaultButtons(
																"check");

											} else {
												$(
														'.liste-cartes .row-carte input:checkbox')
														.screwDefaultButtons(
																"uncheck");
											}
										}
										tempoff = 0;
									});

					$(".liste-cartes .row-carte input:checkbox")
							.change(
									function() {
										if (!this.checked) {
											tempoff = 1;
											$(
													'.liste-cartes .row-order input:checkbox')
													.screwDefaultButtons(
															"uncheck");
											$(this).closest('.row-carte')
													.removeClass('selected');
										} else {
											$(this).closest('.row-carte')
													.addClass('selected');
										}
									});

					// FOCUS DANS LE CHAMPS DE RECHERCHE DE COMPTE
					$('.liste-cartes #input_search_compte')
							.on(
									'focus',
									function() {

										$(
												'.liste-cartes .resultat_search_compte')
												.addClass('active');
										$(
												'.liste-cartes .resultat_search_compte .search_compte')
												.show();

									})
							.on(
									'focusout',
									function() {

										$(
												'.liste-cartes .resultat_search_compte')
												.removeClass('active');
										$(
												'.liste-cartes .resultat_search_compte .search_compte')
												.hide();

									});

					$('.liste-collaborateurs .content select')
							.custom_select_krealid();

					$('.global_liste_collaborateurs .btn-filtres').on(
							'click',
							function(e) {
								e.preventDefault();
								$('.overlay_filtre').show();
								if ($(window).width() > 1024) {
									$('.liste-collaborateurs .block_filtres')
											.show().css('height',
													$(document).height())
											.animate({
												'left' : "-225px"
											}, "fast");
								} else if ($(window).width() > 640) {
									$('.liste-collaborateurs .block_filtres')
											.show().css('height',
													$(document).height())
											.animate({
												'left' : "-80px"
											}, "fast");
								} else {
									$('.liste-collaborateurs .block_filtres')
											.show().css('height',
													$(document).height())
											.animate({
												'left' : "0"
											}, "fast");
								}
								$('body').css('overflow-y', 'hidden');
							});

					// FOCUS DANS LE CHAMPS DE RECHERHCE DE COMPTE
					$('.liste-collaborateurs #input_search_compte')
							.on(
									'focus',
									function() {

										$(
												'.liste-collaborateurs .resultat_search_compte')
												.addClass('active');
										$(
												'.liste-collaborateurs .resultat_search_compte .search_compte')
												.show();

									})
							.on(
									'focusout',
									function() {

										$(
												'.liste-collaborateurs .resultat_search_compte')
												.removeClass('active');
										$(
												'.liste-collaborateurs .resultat_search_compte .search_compte')
												.hide();

									});

				});

$(window).scroll(function () {

    if ($('footer').length > 0) {
        var footerOffset = $('footer').offset().top;

        if (footerOffset < ($(window).scrollTop() + $(window).height())) {
            $('.row_submit').addClass('upFooter')
        } else {
            $('.row_submit').removeClass('upFooter');
        }
    }
});

function uapShowLoader(loaderSelector) {
	loaderSelector.removeClass("hide");
}
function uapHideLoader(loaderSelector) {
	loaderSelector.addClass("hide");
}
function uapDisplayMessage(selector, typeAlert, message, scroll, hideSuccess) {
	selector.html("");
	var messageObject = {
		"typeAlert" : typeAlert,
		"message" : message
	};
	var template = $("#uapMessageTemplate").html();
	Mustache.parse(template);
	var rendered = Mustache.to_html(template, messageObject);
	selector.show();
	selector.html(rendered);
	if (scroll) {
		$('html, body').animate({
			scrollTop : selector.offset().top - 150
		}, 'slow');
	}
	if (hideSuccess && typeAlert === "success") {
		window.setTimeout(function() {
			selector.find(".alert").fadeTo(500, 0).slideUp(500, function() {
				$(this).remove();
			});
		}, 5000);
	}
}
function uapGetUrlParameters() {
	var pageParams = {};
	location.search.substr(1).split("&").forEach(function(item) {
		pageParams[item.split("=")[0]] = item.split("=")[1];
	});
	return pageParams;
}
function uapIsIEorEDGE() {
	if (navigator.appName == 'Microsoft Internet Explorer') {
		return true; // IE
	} else if (navigator.appName == "Netscape") {
		if (navigator.appVersion.indexOf('Trident') === -1)
			return false; // other browser
		else
			return true; // Edge
	}
	return false;
}