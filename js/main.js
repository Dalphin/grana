AUI().ready(

		/*
		 * This function gets loaded when all the HTML, not including the
		 * portlets, is loaded.
		 */

function() {
	if(Liferay.ThemeDisplay.isSignedIn()){
		if(Liferay.Session != undefined){
		Liferay.Session.display._beforeHostWarned = function() {
			var instance = this;
			var host = instance._host;
			var warningLength = host.get('warningLength');
			var remainingTime = warningLength;
			instance._formatTime(remainingTime);
			instance._intervalId = host.registerInterval(function(
					elapsed, interval, hasWarned, hasExpired,
					isWarningMoment) {
				if (!hasWarned) {
					instance._uiSetActivated();
				} else if (!hasExpired) {
					if (isWarningMoment) {
						if (remainingTime <= 0) {
							remainingTime = warningLength;
						}
						showSessionWarning(instance);
					}
					instance._formatTime(remainingTime);
				}
				remainingTime -= interval;
			})
		}
		Liferay.Session._expireSession = function() {
			var instance = this;
            Liferay.Util.fetch("/c/portal/logout").then(function(response) {
            	window.location.href=publicfriendlyURL+'/session-timeout';
            })
		}
	}
	 }
});

function showSessionWarning(instance) {
	var audio = new Audio(timeoutAlertSound);
	audio.play();
	var isOldTitle = true;
	var oldTitle = $("title").text();
	var newTitle = "Alert - Session Timeout";
	function changeTitle() {
		document.title = isOldTitle ? oldTitle : newTitle;
		isOldTitle = !isOldTitle;
	}
	var interval = setInterval(changeTitle, 700);
	$("#session_warning_popup").dialog({
				modal : !0,
				width : "320px",
				closeOnEscape : false,
				open : function() {
					$(document).on(
							'click',
							'#session_warning_btn',
							function() {
								$("#session_warning_popup").dialog('close');
								instance._host.extend();
							});
				},
				close : function() {
					clearInterval(interval);
					$("title").text(oldTitle);
				}
			})
}

Liferay.Portlet.ready(
	/*
	 * This function gets loaded after each and every portlet on the page.
	 * 
	 * portletId: the current portlet's id node: the Alloy Node object of the
	 * current portlet
	 */
		 function(portletId, node) {
			}
);



Liferay.on(
	'allPortletsReady',
	/*
	This function gets loaded when everything, including the portlets, is on
	the page.
	*/
	function() {
		if(themeDisplay.isSignedIn()){
			if(!disableInit){
				ChatboxInit();
				screenMirroring();
			}
		}
	}
);

function screenMirroring(){
	document.body.addEventListener('DOMNodeInserted', function( event ) {
		if(event.target.id=="unigone-cob-container") screenSharingHideImage();
	}, false);
	$( document ).ajaxComplete(function( event, request, settings ) {
		$(document).find("#unigone-cob-container").length>0 && (screenSharingHideImage());
	});
	function screenSharingHideImage(){
		$(".screenSharingHideImage").css({"display":"none"});
	 	$(".tscobrowsing-buttons").off('click').on('click',function() {
			$(".screenSharingHideImage").css({"display":"block"});
		});
	}
	initSelect2Mirroring();
}

function initSelect2Mirroring(){
	$('.select2_mirroring').each(function(){
		var id = $(this).attr('id') || '';			
		var select2OpenContainer = $('#select2-'+id+'-results').parent('.select2-container--open'),
			select2TextContainer = $('#select2-'+id+'-container').parent('.select2-container');
		// DOM: selectors - select results DOM and selected text DOM;
		$(document).on('DOMNodeInserted', [select2OpenContainer, select2TextContainer], function(){
        	$(this).find('li.select2-results__option').attr('unigone-cob-blur', 'true');
        	$(this).find('.select2-search__field').attr('unigone-cob-blur', 'true');
        	$(this).find('#select2-'+id+'-container').attr('unigone-cob-blur', 'true');
    		$(this).find('.select2-selection__choice').attr('unigone-cob-blur', 'true');
        });
	});
}

function ChatboxInit(){
		setTimeout(function(){ 
			function dyduAfterLoad() {
				dydu.chatbox.registerContext('user_firstname', user_firstname); 
				dydu.chatbox.registerContext('user_lastname', user_lastname); 
				dydu.chatbox.registerContext('user_email',  user_email); 
				dydu.chatbox.registerContext('user_client', user_client); 
				dydu.chatbox.registerContext('user_client_name', user_client_name); 
				dydu.chatbox.registerContext('user_id', user_id); 
				dydu.chatbox.registerContext('user_contact', user_contact); 
			}
			var chat=$("#dydu-chatbox-app").detach() 
			$("header").prepend(chat)

			if((typeof(user_id) !== "undefined")&& user_id[0]=="8" && user_id[1]=="7") dyduAfterLoad();
		},3000);	
} 

function  initializeMonthPicker(){
	var getLocale = themeDisplay.getLanguageId().split('_')[0];
	var localUi = getLocale;
	$.datepicker.setDefaults($.datepicker.regional[localUi]);
	var themeRootUrl=themeDisplay.getPathThemeRoot();
	$(".month-picker").MonthPicker({
		MinMonth: '-3y', 
	    MaxMonth: '-1m',
	    UseInputMask: true,
	    isYearPicker: false,
	    Button: function () {
	        return $('<img class="ui-datepicker-trigger" style="float: right;right: 70px;position: relative;top: 12px;" src="'+themeRootUrl+'/Content/img/commun/picto-calendar.svg" alt="Show Date" title="' + "Choisir un mois" + '">');
	    }
	});
    //Month picker Regional language initialize
	setMonthPickerLocalize(localUi);
}

function setMonthPickerLocalize(localUi){
	 $.MonthPicker = {
        i18n: {
            year: "Année",
            buttonText: "Choisir un mois",
            prevYear: jQuery.datepicker.regional[localUi].prevText,
            nextYear: jQuery.datepicker.regional[localUi].nextText,
            next12Years: "Avancer de 12 ans",
            prev12Years: "Reculer de 12 ans",
            nextLabel: "Suivant",
            prevLabel: "Précédent",
            jumpYears: "Choisir l'année",
            backTo: "Retourner à",
            months: [jQuery.datepicker.regional[localUi].monthNames[0],
                jQuery.datepicker.regional[localUi].monthNamesShort[1],
                jQuery.datepicker.regional[localUi].monthNamesShort[2],
                jQuery.datepicker.regional[localUi].monthNamesShort[3],
                jQuery.datepicker.regional[localUi].monthNamesShort[4],
                jQuery.datepicker.regional[localUi].monthNamesShort[5],
                jQuery.datepicker.regional[localUi].monthNamesShort[6],
                jQuery.datepicker.regional[localUi].monthNamesShort[7],
                jQuery.datepicker.regional[localUi].monthNamesShort[8],
                jQuery.datepicker.regional[localUi].monthNamesShort[9],
                jQuery.datepicker.regional[localUi].monthNamesShort[10],
                jQuery.datepicker.regional[localUi].monthNamesShort[11],
                jQuery.datepicker.regional[localUi].monthNamesShort[12]]
        },
        Button: function (options) {
            return $('<img class="ui-datepicker-trigger" src="'+themeRootUrl+'/Content/img/commun/picto-calendar.svg" alt="Show Date" title="' + options.i18n.buttonText + '">')
                .button({
                    text: false,
                    icons: {
                        primary: options.ButtonIcon
                    }
                });
        }
    }
}

function detectIE() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf('MSIE ');
	var trident = ua.indexOf('Trident/');
	var edge = ua.indexOf('Edge/');
	if (msie > 0 || trident > 0 || edge > 0 ) {
		return true;
	}
	return false;
}

function formatAjaxResponse(respObj){ 
	if(detectIE()){
		return JSON.parse(respObj);
	}	
	return respObj;
}
function sessionEnd() {
	$.ajax({
		type: 'POST',
		async: false,
		url: "/c/portal/logout",
		data: "",
		success: function() {
			window.location.href=publicfriendlyURL+'/session-timeout';
		},
		error: function(){
			window.location.href=publicfriendlyURL+'/session-timeout';
		}
	}); 
} 

(function ($) {
	//Form to json
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    
    $.fn.preventDoubleSubmit = function () {
        $(this).submit(function () {
            if (this.beenSubmitted)
                return false;
            else
                this.beenSubmitted = true;
        });
    };
    
    $.fn.FormSubmitWithPreventDoubleSubmit = function () {
 	   var $form = this;
 	   var form = this.get(0);
 	   if (!$form.data('submitted')) {
 		   $form.data('submitted', true);
 		   //Trigger native submit event on DOM form element (not jQuery object).
 		   form.submit();
 	   }
 	   return $form;
 	};
 	
})(jQuery);