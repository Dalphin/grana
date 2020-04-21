// Common JS :::::::
// Version - V1.1
// Created @ 03.09.2018
var getCulture = themeDisplay.getLanguageId().replace('_', '-'),
	getLocale = themeDisplay.getLanguageId().split('_')[0];
Globalize.culture(getCulture);
window.localUi = getLocale;
window.popinProcessId = "loading-dialog";
window.popinprocesshandler = null,
window.popinProcessTimeout = 300;
var NotesTxt = '';
/*********************************** Show and Hide Loading Popup ***********************************/
function showLoader() {
    if (window.popinprocesshandler == null)
        try {
            var n = $("#" + window.popinProcessId);
            n.is(":visible") || (window.popinprocesshandler = setTimeout(function() {
                n.dialog({
                    modal: !0,
                    closeOnEscape: !0,
                    draggable: !1,
                    resizable: !1,
                    dialogClass: window.popinProcessId,
                })
            }, window.popinProcessTimeout))
        } catch (t) {
        }
}
function hideLoader(n) {
    try {
        var t = $("#" + window.popinProcessId);
        (n === !0 || t.is(":visible")) && t.dialog("close");
        window.popinprocesshandler != null && (clearTimeout(window.popinprocesshandler),
        window.popinprocesshandler = null)
    } catch (i) {
    }
}
/*********************************** Show and Hide Loading Popup ***********************************/

/*********************************** Radion button selection ***********************************/

function SelectRadioButton(name, value) {
	$("input:radio[name='"+name+"'][value='"+value+"']").prop('checked', true);
	return false; // Returning false would not submit the form
}

/*********************************** Radion button selection ***********************************/


/*********************************** Sort button selection ***********************************/

// Sort array of objects by string property value using LocaleCompare

function compareProperty(a, b) {
	return (a || b) ? (!a ? -1 : !b ? 1 : a.localeCompare(b)) : 0;
}

/*********************************** Show Datepicker ***********************************/
var themeRootUrl = $("#themeRootUrl").attr("value");
var currencyFormat,currencyFormatNegative;
$(document).ready(function () {
	initDatePicker();
	mobilityToolTipInitialize();
	if($(".nav-bar-global").length != 0) {
		var navBarHeight = $(".nav-bar-global").position().top || 80;
		initMainMenuScroller(".nav-bar-global", navBarHeight);
	}
	//search-hook js
	$(".clear_search").on('click',function(){
	       $(".input_search").val('');
	       $(this).closest("form").submit();
	   });
	//webcontent js
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
	currencyFormatInitialize();
	currencyFormatNegativeInitialize();
	
	$("table").on('page.dt', function() {
		var offsetTop=$(this).offset().top-$("header").eq(0).height();
		$('html, body').animate({
		    scrollTop:offsetTop
		   }, 'slow');
		});
	bannerMsgHeight();
}); 
$(window).resize(function(){
	var bannerMsgHeight = $(".message_info").height();
	$(".message_info .info_icon").height(bannerMsgHeight);
});
function bannerMsgHeight() {
	var bannerMsgHeight = $(".message_info").height();
	$(".message_info .info_icon").height(bannerMsgHeight);
}

function mobilityToolTipInitialize(){
	$('.mobility_tooltipHint').tooltip({
		position: {
	        using: function( position, t ) {
	         $( this ).css({left:"-50px",top:"25px"} );
	         $( this ).appendTo(".mobility_tooltipHint .picto-info");
	        }
	      } ,
		content : function(position) {
			var element = $(this);
			return element.find('.tooltip_wrap').html();
		},
		close : function(event, ui) {

		}
	});
	
}

function currencyFormatInitialize(){
	typeof(currencyFormat) !== "undefined" && (currencyFormat.destroy());
	var localUI = window.localUi;
	currencyFormat = new CurrencyFormat(localUI,'.bg_euro');
	currencyFormat.init();
}
function currencyFormatNegativeInitialize(){
	typeof(currencyFormatNegative) !== "undefined" && (currencyFormatNegative.destroy());
	var localUI = window.localUi;
	currencyFormatNegative = new CurrencyFormat(localUI,'.bg_euro_negative',true);
	currencyFormatNegative.init();
}

function initDatePicker() {
	jQuery.datepicker.setDefaults(jQuery.datepicker.regional[localUi]);
    var options = {
        dateFormat: "dd/mm/yy",
        beforeShow: function (input) {
            $(input).css({
                "position": "relative",
                //"z-index": 860,
                "text-align": "left"
            });
        },
        yearRange: "-100:+100",
        changeYear: true,
        changeMonth: true,
        showOn: 'button',
        buttonText: "Ouvrir le calendrier",
        buttonImageOnly: true,
        buttonImage: themeRootUrl+'/Content/img/commun/picto-calendar.svg',
    };
    $(".datefield").datepicker(options);
    $(".datefield").mask("99/99/9999"); 
}
/*********************************** Show Datepicker ***********************************/

/*********************************** Show MonthPicker ***********************************/

function initMonthPicker(ele) {	
    $(ele).MonthPicker({
    	MinMonth: '-3y', 
	    MaxMonth: '-1m',
        UseInputMask: true,
        isYearPicker: false,
        Button: function () {
	        return $('<img class="ui-datepicker-trigger" src="'+themeRootUrl+'/Content/img/commun/picto-calendar.svg" alt="Show Date" title="' + "Choisir un mois" + '">');
	    }
    });
}

/*********************************** Show MonthPicker ***********************************/


/*********************************** Show Yearpicker ***********************************/

function initYearPicker(ele) {	
    $(ele).MonthPicker({
        MinMonth: '-3y',
        MaxMonth: '+0y',
        UseInputMask: true,
        MonthFormat: 'yy',
        isYearPicker: true,
        Button: function () {
	        return $('<img class="ui-datepicker-trigger" src="'+themeRootUrl+'/Content/img/commun/picto-calendar.svg" alt="Show Date" title="' + "Choisir un mois" + '">');
	    }
    });
}

/*********************************** Show Yearpicker ***********************************/

/*********************************** Form Validation Custom Add Method ***********************************/

var translation = { };
translation.requiredField = "Champ non renseigné";
translation.invalidFormat = "Le format saisi n'est pas valide";
translation.invalidDate = "La date n'est pas valide";
translation.invalidEmail = "L'email saisi n'est pas valide.";
translation.dateLowerThanOrEqualsCurrent = "La date doit être inférieure ou égale à la date courante";
translation.validateLessThanOrEqual = "La date doit être inférieure ou égale à la date du jour";
translation.validateLessThan = "La date doit être inférieure à la date du jour";
translation.validateGreaterThanOrEqual = "La date doit être supérieure ou égale";
translation.validateGreaterThan = "La date doit être supérieure";
translation.validateGreaterThanStart = "La date de fin doit être supérieure à la date début";
translation.validateDateRequired = "Champ non renseigné";
translation.validateValidDate = "Le format saisi n'est pas valide";
translation.validateValidNumber =  "Le format saisi n'est pas valide";
translation.validateValidHour = "L'heure saisie n'est pas valide.";
translation.invalidValue = "Le format saisi n'est pas valide";
translation.loading = "Chargement en cours...";
translation.datepickerTootip = "Ouvrir le calendrier";

jQuery.validator.addMethod( "date", function(value) {
	if(value == '') return true;
    if(value.indexOf('_') == -1)
        return isValidDate(value);
    return true;
}, translation.invalidDate);

jQuery.validator.addMethod("lessThanOrEqual", function(n, t, i) {
    if (this.optional(t) || $(i) == undefined)
        return !0;
    var r = $(i).val() || "";
    n = n || "";
    if(r === "" || n === "" || Globalize.parseDate(r) == null) return !0;
	return (/Invalid|NaN/.test(Globalize.parseDate(n))) ? isNaN(n) && isNaN($(i).val()) || Number(n) <= Number($(i).val()) : Globalize.parseDate(n) <= Globalize.parseDate(r);
}, translation.validateLessThanOrEqual);

jQuery.validator.addMethod("noFutureDate", function(n) {
    var t = new Date;
    return Globalize.parseDate(n) <= new Date(t.getFullYear(),t.getMonth(),t.getDate())
}, translation.validateLessThanOrEqual);

jQuery.validator.addMethod("noFutureDateTime", function(n, t, i) {
    if ($(i.date).val() == "")
        return !0;
    var u = new Date
      , r = Globalize.parseDate($(i.date).val());
    return r == null ? !1 : (r.setHours($(i.hours).val() == "" ? 0 : parseInt($(i.hours).val())),
    r.setMinutes($(i.minutes).val() == "" ? 0 : parseInt($(i.minutes).val())),
    r <= u)
}, translation.validateLessThanOrEqual);

jQuery.validator.addMethod("absoluteFutureDate", function(n) {
    var t = new Date;
    return Globalize.parseDate(n) > new Date(t.getFullYear(),t.getMonth(),t.getDate())
}, translation.validateGreaterThan);

jQuery.validator.addMethod("futureDate", function(n) {
    var t = new Date;
    return Globalize.parseDate(n) >= new Date(t.getFullYear(),t.getMonth(),t.getDate())
}, translation.validateGreaterThanOrEqual);

jQuery.validator.addMethod("lessThan", function(n, t, i) {
	if(this.optional(t) || $(i) == undefined) return !0;
	return (/Invalid|NaN/.test(Globalize.parseDate(n))) ? isNaN(n) && isNaN($(i).val()) || Number(n) < Number($(i).val()) :  Globalize.parseDate(n) < Globalize.parseDate($(i).val());
}, translation.validateLessThan);

jQuery.validator.addMethod("greaterThanOrEqual", function(n, t, i) {
    var r, f, u;
    r || "", n = n || "";
    if(this.optional(t) || $(i) == undefined || (r = $(i).val(), r == "" || n == "")) return !0;
    if(Globalize.parseDate(n) != null) {
    	if(f = !1, Globalize.parseDate(r) != null && (f = !0), u = Globalize.parseDate(r), /Invalid|NaN/.test(u) && (u = Globalize.parseDate(r)), u == null) 
    		return !0;
    	else 
    		return (f && (u = Globalize.parseDate(r)), Globalize.parseDate(n) >= new Date(u.getFullYear(),u.getMonth(),u.getDate()));
    }
    else 
    	return isNaN(n) && isNaN(r) || Number(n) >= Number(r);
}, translation.invalidDate);

jQuery.validator.addMethod("greaterThan", function(n, t, i) {
	if(this.optional(t) || $(i) == undefined) return !0;
    return /Invalid|NaN/.test(Globalize.parseDate(n)) ? isNaN(n) && isNaN($(i).val()) || Number(n) > Number($(i).val()) : Globalize.parseDate(n) > Globalize.parseDate($(i).val())
}, translation.validateGreaterThan);

jQuery.validator.addMethod("greaterThanStart", function(n, t, i) {
	if(this.optional(t) || $(i) == undefined) return !0;
    return /Invalid|NaN/.test(Globalize.parseDate(n)) ? isNaN(n) && isNaN($(i).val()) || Number(n) > Number($(i).val()) : Globalize.parseDate(n) > Globalize.parseDate($(i).val())
}, translation.validateGreaterThanStart);

jQuery.validator.addMethod("longEmail", function(n) {
    if (n == "")
        return !0;
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([+a-z0-9_][+-a-z0-9_]*(\.[+-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(n)
}, translation.invalidFormat);

var phoneRegex = /^$|(^0[0-9]{9})|(^0[0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2})|(^\+\([0-9]{2}\) [0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2})|(^\+\([0-9]{2}\)[0-9]{9})|(^\+[0-9]{11})/;
$.validator.addMethod("phone", function(n) {
    return phoneRegex.test(n)
});

$.validator.defaults.onfocusout = function(n) {
    $(n).hasClass("error") && ($(n).hasClass("datefield") || $(n).valid())
};

$.validator.defaults.onkeyup = function(n) {
    $(n).hasClass("error") && $(n).valid()
};

function isValidDate(s) {
	var bits = s.split('/');
	var d = new Date(bits[2], bits[1] - 1, bits[0]);
	return d && (d.getMonth() + 1) == bits[1];
}

/*********************************** Form Validation Custom Add Method ***********************************/

/*********************************** Show tooltip ***********************************/
$('.tooltipHint').tooltip({
    content: function () {
        var element = $(this);
        return element.find('.tooltip_wrap').html();
    }
});
$('.grana-tooltip').tooltip({
	tooltipClass: "grana-theme-tooltip",	 
	position: {
        my: "center top",
        at: "center bottom-5",
        collision: "flip",
        using: function( position, feedback ) {
            $( this ).addClass( feedback.vertical )
                .css( position );
        }
    },
    close: function(event, ui) {
        ui.tooltip.hover(function() {
            $(this).stop(true).fadeTo(400, 1); 
        },
        function() {
            $(this).fadeOut('400', function(){
                $(this).remove();
            });
        });
    }
});
/*********************************** Show tooltip ***********************************/

/*********************************** Select2 Dropdown with search filter ***********************************/
var select2Filter = function(){
	var filterResult = function(option){
		var r = $(option.ele);
		r.select2({
	        minimumInputLength: option.count || 3,
	        allowClear: !0,
	        multiple: !1,
	        placeholder: "",
	        language: 'fr',
	        ajax: {
	            url: t,
	            dataType: "json",
	            method: "post",
	            quietMillis: 250,
	            data: function(n) {
	                return {
	                    term: n.term
	                }
	            },
	            processResults: function(n) {
	                return {
	                    results: n
	                }
	            },
	            cache: !0
	        }
	    })
	};
	return filterResult;
}


var GlabalDateTimeSet=function(DateTime,dateformat){
	var currentDate = moment.utc().format(DateTime);
	var mydate = moment(currentDate,dateformat); 
	var localTime  = moment.utc(moment(mydate).format("MM/DD/YYYY HH:mm")).toDate();
	localTime = moment(localTime).format('DD/MM/YYYY HH:mm');
	return localTime; 
}


var GlabalDateSet=function(Date,dateformat){ 
	var currentDate = moment.utc().format(Date);  
	var mydate = moment(currentDate,dateformat); 
	var localTime  = moment.utc(moment(mydate).format("MM/DD/YYYY")).toDate();
	localTime = moment(localTime).format('DD/MM/YYYY');
	return localTime;
}
/*********************************** Select2 Dropdown with search filter ***********************************/


/*********************************** Datatable sorting ***********************************/

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "date-uk-pre": function ( a ) {
        var ukDatea = a.split('/');
        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
    },
    "date-uk-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "date-uk-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"date-format-pre": function ( a ) {
		if (a == null || a == "") {
			return 0;
		}
		var splittedDate = a.split('/');
		return ((splittedDate[2] || "") + (splittedDate[1] || "") + (splittedDate[0] || "")) * 1;
	},

	"date-format-asc": function ( a, b ) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"date-format-desc": function ( a, b ) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
} );

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "datetime-format-asc": function ( a, b ) {
        var x, y;
        if (jQuery.trim(a) !== '') {
            var deDatea = jQuery.trim(a).split(/[ <br>]+/);
            var deTimea = deDatea[1].split(/[:h]+/);
            var deDatea2 = deDatea[0].split('/');
                        if(typeof deTimea[2] != 'undefined') {
                            x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1] + deTimea[2]) * 1;
                        } else {
                            x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
                        }
        } else {
            x = -Infinity; // = l'an 1000 ...
        }
 
        if (jQuery.trim(b) !== '') {
            var deDateb = jQuery.trim(b).split(/[ <br>]+/);
            var deTimeb = deDateb[1].split(/[:h]+/);
            deDateb = deDateb[0].split('/');
                        if(typeof deTimeb[2] != 'undefined') {
                            y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1] + deTimeb[2]) * 1;
                        } else {
                            y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
                        }
        } else {
            y = -Infinity;
        }
        var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
        return z;
    },
 
    "datetime-format-desc": function ( a, b ) {
        var x, y;
        if (jQuery.trim(a) !== '') {
            var deDatea = jQuery.trim(a).split(/[ <br>]+/);
            var deTimea = deDatea[1].split(/[:h]+/);
            var deDatea2 = deDatea[0].split('/');
                        if(typeof deTimea[2] != 'undefined') {
                            x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1] + deTimea[2]) * 1;
                        } else {
                            x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
                        }
        } else {
            x = Infinity;
        }
 
        if (jQuery.trim(b) !== '') {
            var deDateb = jQuery.trim(b).split(/[ <br>]+/);
            var deTimeb = deDateb[1].split(/[:h]+/);
            deDateb = deDateb[0].split('/');
                        if(typeof deTimeb[2] != 'undefined') {
                            y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1] + deTimeb[2]) * 1;
                        } else {
                            y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
                        }
        } else {
            y = -Infinity;
        }
        var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
        return z;
    },
 
    "date-format-asc": function ( a, b ) {
        var x, y;
        if (jQuery.trim(a) !== '') {
            var deDatea = jQuery.trim(a).split('/');
            x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
        } else {
            x = Infinity; // = l'an 1000 ...
        }
 
        if (jQuery.trim(b) !== '') {
            var deDateb = jQuery.trim(b).split('/');
            y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
        } else {
            y = -Infinity;
        }
        var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
        return z;
    },
 
    "date-format-desc": function ( a, b ) {
        var x, y;
        if (jQuery.trim(a) !== '') {
            var deDatea = jQuery.trim(a).split('/');
            x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
        } else {
            x = -Infinity;
        }
        if (jQuery.trim(b) !== '') {
            var deDateb = jQuery.trim(b).split('/');
            y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
        } else {
            y = Infinity;
        }
        var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
        return z;
    }
} );


jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"currency-format-pre": function ( a ) {
		a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
		(a===null||a==='') && (a=-11111111111111111111111);
		return parseFloat( a );
	},

	"currency-format-asc": function ( a, b ) {
		return a - b;
	},

	"currency-format-desc": function ( a, b ) {
		return b - a;
	}
});

/*********************************** Datatable sorting ***********************************/

/*********************************** Create Logs ***********************************/

window.disabledLog = true;
window.log = function() {
	if(window.disabledLog) return;
}

/*********************************** Create Logs ***********************************/



/*********************************** Select2 - Enable focus on widget ***********************************/

if ($.ui && $.ui.dialog && $.ui.dialog.prototype._allowInteraction) {
    var ui_dialog_interaction = $.ui.dialog.prototype._allowInteraction;
    $.ui.dialog.prototype._allowInteraction = function(e) {
        if ($(e.target).closest('.select2-dropdown').length) return true;
        return ui_dialog_interaction.apply(this, arguments);
    };
}

/*********************************** Select2 - Enable focus on widget ***********************************/

function getUTCDateTime(){
	var now = new Date();
	var utcTime = prefixZero(now.getUTCDay()) + "/" + prefixZero(now.getUTCMonth() + 1) + "/" + now.getUTCFullYear() + " " + prefixZero(now.getUTCHours()) + ":" + prefixZero(now.getUTCMinutes()) +":" + prefixZero(now.getUTCSeconds());
	return utcTime;
}

function prefixZero(val){
	var str = new String(val);
	return str.padStart(2, "0");
}

function getQueryParam(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)')
	.exec(window.location.search);
	return (results !== null) ? results[1] || 0 : "";
}

function HTMLEncode(str) {
	var i = str.length, aRet = [];
	while (i--) {
		var iC = str[i].charCodeAt();
		if (iC < 65 || iC > 127 || (iC > 90 && iC < 97)) {
			aRet[i] = '&#' + iC + ';';
		} else {
			aRet[i] = str[i];
		}
	}
	return aRet.join('');
}

$(document).ajaxError(function(xhr, response) {
	if(response.status == 500 && response.responseText && response.responseText.indexOf("graError") > -1){
		hideLoader();
		if(err500URL && err500URL != "") {
			window.location.href = err500URL;	
		}
	}
});

function getParameterByName(name, url) {
	if (!url)
		url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex
			.exec(url);
	if (!results)
		return null;
	if (!results[2])
		return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

jQuery.fn.forceNumeric = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;
            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers   
                key >= 48 && key <= 57 ||
            // Numeric keypad
                key >= 96 && key <= 105 ||
            // comma, period and minus, . on keypad
               key == 190 || key == 188 || key == 109 || key == 110 ||
            // Backspace and Tab and Enter
               key == 8 || key == 9 || key == 13 ||
            // Home and End
               key == 35 || key == 36 ||
            // left and right arrows
               key == 37 || key == 39 ||
            // Del and Ins
               key == 46 || key == 45) 
                return true;
            return false;
        });
    });
};

function ESresize(){
	/* Trigger window resize function in javascript */
	if (typeof (Event) === 'function') {
        // modern browsers
		window.dispatchEvent(new Event('resize'));
    } else {
        //This will be executed on old browsers and especially IE
        var resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(resizeEvent);
    }
}

function initMainMenuScroller(ele, height){
	var getEleLength = $(ele).length;
	if(getEleLength == 0) return false;
	var setHeight = height || 0;
	$(ele).mCustomScrollbar('destroy');
	$(ele).mCustomScrollbar({
	    theme: "grana-scroll-theme",
	    setHeight: window.innerHeight - setHeight,
	    scrollbarPosition: "inside",
	    autoHideScrollbar: true,
	    scrollInertia: 500,
	    mouseWheel:{ preventDefault: true }
	});
}

$.fn.addStripesToTable = function () {
	$(this).find("tr").removeClass('strip_oddRow strip_evenRow');
	$(this).find('tr:visible:odd').addClass('strip_oddRow');
	$(this).find('tr:visible:even').addClass('strip_evenRow');
};

/*Method restricts negative values for the given input elem*/
function restrictNegativeValues(elem){
	elem.keypress(function (e) {
	    //if the letter is not digit then display error and don't type anything
	    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	    	return false;
	   }
	});
}

/*Detail Page Notes start*/
function NoteDisplay() {
	$(".status").hide();
	if ($("#notes").text() == "")
		$(".add-button").show(), $(".notes").hide();
	else
		$(".editDom").show(), $("#NotesTxt").attr("disabled", true);
}

function SaveNotes(url) {
	showLoader()
	$.ajax({
		url : url,
		data : {
			cardId : $("#cardId").val(),
			notes : $("#NotesTxt").val()
		},
		type : "POST",
		dataType : "json",
		success : function(results) {
			$("#NotesTxt").val(results.data).attr("disabled", true);
			$(".saveDom,.EditSaveDom").hide();
			$(".editDom").show();
			$("#NotesTxt").scrollTop(0);
			hideLoader();
		}
	})
}

function DeleteNotes(url) {
	showLoader();
	$.ajax({
		url : url,
		data : {
			cardId : $("#cardId").val()
		},
		dataType : "json",
		type : "POST",
		success : function() {
			$(".status,#NotesTxt").hide();
			$(".add-button").show();
			hideLoader();
		}
	})

}
function EditNotes() {
	NotesTxt = $("#NotesTxt").val();
	$("#NotesTxt").attr("disabled", false);
	$(".editDom").hide();
	$(".EditSaveDom").show();
	SetCaretAtEnd(document.getElementById("NotesTxt"));
}

function NoteDeletePopup() {
	$("#PopInProcess").dialog({
		modal : !0,
		dialogClass : "formulaire",
		width : 500
	});
}

function NotesClickEvents() {
	$(".add-button").click(function() {
		$("#NotesTxt").val("").attr("disabled", false);
		$(".add-button").hide();
		$(".notes,.saveDom").show();
	});
	$(".delete-button").click(function() {
		NoteDeletePopup();
	})
	$(".edit-button").click(function() {
		EditNotes();
	})
	$(".saveDom .btn_save").click(function() {
		var SaveUrl = $("#createOrUpdateNotesUrl").val();
		if ($("#NotesTxt").val().trim().length > 0)
			SaveNotes(SaveUrl);
		else
			$(".saveDom,.notes").hide(), $(".add-button").show();
	});
	$(".EditSaveDom .btn_save").click(function() {
		var SaveUrl = $("#createOrUpdateNotesUrl").val();
		var deleteUrl = $("#deleteNotesUrl").val();
		if ($("#NotesTxt").val().trim().length > 0)
			SaveNotes(SaveUrl);
		else
			DeleteNotes(deleteUrl);
	});
	$("#btnDeleteConfirm").click(function() {
		var deleteUrl = $("#deleteNotesUrl").val();
		DeleteNotes(deleteUrl)

	});
	$(".btn_resetEdit").click(function() {
		$("#NotesTxt").val(NotesTxt);
		$(".EditSaveDom").hide();
		$("#NotesTxt").attr("disabled", true);
		$("#NotesTxt").scrollTop(0);
		$(".editDom").show();
		$(".notes").removeClass("error");
		$("#NotesTxt-error").remove();
	});
	$(".btn_resetSave").click(function() {
		$(".saveDom,.notes").hide();
		$(".add-button").show();
		$(".notes").removeClass("error");
		$("#NotesTxt-error").remove();
	});
	$("#btnDeleteCancel").click(function() {
		$("#PopInProcess").dialog("close");
	});
}

function SetCaretAtEnd(elem) {
	var elemLen = elem.value.length;
	// For IE Only
	if (document.selection) {
		// Set focus
		elem.focus();
		// Use IE Ranges
		var oSel = document.selection.createRange();
		// Reset position to 0 & then set at end
		oSel.moveStart('character', -elemLen);
		oSel.moveStart('character', elemLen);
		oSel.moveEnd('character', 0);
		oSel.select();
	} else if (elem.selectionStart || elem.selectionStart == '0') {
		// Firefox/Chrome
		elem.selectionStart = elemLen;
		elem.selectionEnd = elemLen;
		elem.focus();
	}
}

function NoteValidate() {
	var validator = $("#NotesForm").validate();
	validator.destroy();
	$("#NotesForm").validate({
		errorElement : 'span',
		errorPlacement : function(error, element) {
			(element).parent().children("span.error").remove();
			$(error).appendTo($(element).parent());
		},
		ignore : '',
		rules : {
			"attachmentNote" : {
				required : true
			}
		},
		messages : {
			"attachmentNote" : {
				required : window.message.reqiured,
			}
		}
	});
}

/*Detail Page Notes end*/


/* globals - Client-Account-Division List */
var CADList = CADList || {};
(function (CADList, $) {
	'use strict';
	// CONSTANTS - create constant variables if need.
	
    // MODULES
	EventHandler = {},
    UIController = {},
    Core = {};
	
	/*
		* UI CONTROLLER MODULE
		* Keeps all the ui-related stuff.
	*/
	var UIController = { 
		// Attaches drag event to the keyboard
		loadClient: function(){
			var settings = Core.options;
			var clientAccLists = JSON.parse(settings.CADJson.replace(/name/g,'text'));
			var custAcc = this.sortArr(clientAccLists.customerAccounts.slice(0), settings.clientSortedKey);
			var customerAcc = $.map(custAcc, function (obj) {
				obj.text = (settings.clientSelectedText =='') ? (obj.code + " - "+ obj.text) : obj[settings.clientSelectedText] ;
				obj.parentID = obj.id;
				obj.id = obj[settings.clientSelectedValue];
				return obj;
			});
			var dataLength = customerAcc.length || 0;
			var getSearchResults = (dataLength == 1) ? "Infinity" : 0;
			$(settings.clientDOM).select2({data: customerAcc, minimumResultsForSearch: getSearchResults});
		},
		
		loadAccount: function(){
			var settings = Core.options;
			var result = [];
			var clientAccLists = JSON.parse(settings.CADJson.replace(/name/g,'text'));
			var supportAcc = clientAccLists.supportAccounts.slice(0);
			var clientData = $(settings.clientDOM).select2('data')[0];
			var value = (settings.createClientParentID) ? clientData.parentID : $(settings.clientDOM).val();
			for(var i in supportAcc) {
				if(supportAcc.hasOwnProperty(i)){
					if(supportAcc[i].parent == value) result = supportAcc[i].children;
				}
			}
			var sortSupportAcc = $.map(result, function (obj) {
				obj.text = (settings.accountSelectedText =='') ? (obj.code + " - "+ obj.text) : obj[settings.accountSelectedText] ;
				obj.id = obj[settings.accountSelectedValue];
				return obj;
			});
			this.refreshSelectList($(settings.accountDOM), sortSupportAcc);
			this.loadDivisions($(settings.accountDOM).val());
		},
		
		loadDivisions: function(){
			var settings = Core.options;
			if(!settings.enableDivision) return false;
			var result = [];
			var clientAccLists = JSON.parse(settings.CADJson.replace(/name/g,'text'));
			var divisions = clientAccLists.divisions.slice(0);
			var value = $(settings.accountDOM).val();
			for(var i in divisions) {
				if(divisions.hasOwnProperty(i)) {
					if(divisions[i].parent == value) result = divisions[i].children;
				}
			}
			if(settings.isStatusBased) {
				result = result.filter(function(obj){
					if(obj.statusCode == 6) return obj;
				});
			}
			var divList = $.map(result, function (obj) {
				obj.text = (settings.divisionSelectedText =='') ? (obj.code + " - "+ obj.text) : obj[settings.divisionSelectedText] ;
				obj.id = obj.id;
				return obj;
			});
			var sortedDivList = this.sortArr(divList.slice(0), settings.divisionSortedKey);
			this.refreshSelectList($(settings.divisionDOM), sortedDivList);
		},
		
		// Public methods ::::
		refreshSelectList : function(ele, data) {
			var $ele = $(ele), refreshedList;
			try {
				refreshedList = $ele.select2("destroy");
				$ele.find("option").remove();
			} catch (f) {}
			var dataLength = data.length || 0;
			var getSearchResults = (dataLength == 1) ? "Infinity" : 0;
			refreshedList = $ele.select2({
				data: data,
				minimumResultsForSearch: getSearchResults
			});
			return refreshedList;
		},
		
		sortArr : function(arr, key) {
			return arr.sort(function(a, b){
				return a[key] - b[key];
			});
		},
		
		// ENTRY POINT
		$$load: function () {
			this.loadClient();
			this.loadAccount();
			this.loadDivisions();
		}
	};
	
	/*
		* EventHandler MODULE
		* Keeps all select2 events.
	*/
	var EventHandler = {
		onchangeClient : function(){
			var settings = Core.options;
			$(document).on('change', settings.clientDOM, function() {
				UIController.loadAccount();
			});
		},
		onchangeAccount : function(){
			var settings = Core.options;
			$(document).on('change', settings.accountDOM, function() {
				UIController.loadDivisions();
			});
		},
		$$loadEvents: function () {
			this.onchangeClient();
			this.onchangeAccount();
		}
	};

	/*
		* CORE MODULE
		* Entry point of the application
	*/
	var Core = { 
		isReadyToRun: function () {
			// Checks if the library is already running in the current context.
			if (this.isRunning) {
				return false;
			}
			return true;
		},

		init: function (options) {
			if (!Core.isReadyToRun()) {
				return;
			}
			if ('object' !== typeof options) {
				return;
			}
			else {
				var settings = $.extend({
					clientDOM: '#clientList',
					accountDOM: '#accountList',
					divisionDOM: '#divisionList',
					clientSelectedText: '',
					clientSelectedValue: 'id',
					createClientParentID: false,
					isStatusBased: false,
					accountSelectedText: 'code',
					accountSelectedValue: 'id',
					divisionSelectedText: '',
					clientSortedKey: 'code',
					accountSortedKey: '',
					divisionSortedKey: 'code',
					enableDivision: true,
					CADJson: []
				}, options);
			}
			
			// Variables
			Core.options = settings;
			Core.isRunning = true;
			
			// Load modules
			UIController.$$load();
			EventHandler.$$loadEvents();
		}
	};
	
	// exports
	CADList.init = Core.init;
}(CADList, jQuery));
/* globals - Client-Account-Division List */

function DT_SearchWrapper(tableID, searchDelay) {
	var clearIcon = tableID+'_search_container span.clear_icon';
	debounceSearch(tableID, searchDelay);
	$(document).on('click', clearIcon, function(){
		resetDTSearch(tableID, clearIcon);
	});
}

function resetDTSearch(tableID, clearIcon) {
	var searchEle = tableID+'_search',
		filterIcon = tableID+'_search_container span.search_icon';
	$(clearIcon).hide();
	$(searchEle).val('').focus();
	$(tableID).DataTable().search('').draw();
	$(filterIcon).show();
}

function debounceSearch(tableId, searchDelay) {
    var $searchBox = $(tableId+'_search');
    $searchBox.off();
    var timer = searchDelay || 500;
    var searchDebouncedFn = debounce(function(e) {
    	// KEYCODE:::::: 9: Tab, Up: 38, Down: 40, Right: 39, Left: 37, Esc: 27, Ctrl: 17, Alt: 18, Shift: 16;
    	if([9, 16, 17, 18, 27, 32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }    	
    	var getValue = $searchBox.val().trim() || "";
    	$(tableId+'_search_container .filter_action_icons').hide();
		var clearIcon = $(tableId+'_search_container span.clear_icon'),
		filterIcon = $(tableId+'_search_container span.search_icon');
		clearIcon.toggle((getValue.length != 0));
		filterIcon.toggle(!(getValue.length != 0));
        $(tableId).DataTable().search($searchBox.val()).draw();
    }, timer);
    $searchBox.on("keyup", searchDebouncedFn);
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function DT_DropdownWrapper(tableID, optionLength){
	var selectDOM = document.createElement('select');
	var wrapperEle = tableID+'_DT_dropdown_wrapper';
	selectDOM.className = "customActive";
	var optLength = optionLength || [15,30,50,100];
	var options = optLength.map(function(i){
		return "<option value='"+i+"'>"+i+"</option>";
	}).join();
	selectDOM.innerHTML = options;
	$(wrapperEle).css('display', 'inline-block');
	$(wrapperEle).empty().append(selectDOM);
	$(wrapperEle).find('.customActive').custom_select_krealid();
	var optionEle = wrapperEle+" .options .option";
	$(document).on("click", optionEle, function() {
		var pageLength = this.innerText;
		pageLength = parseInt(pageLength);
		$(tableID).DataTable().page.len(pageLength).draw();
	});
}

function redirectToJenji(jenjiUrl,target,origin,entityIds){
	showLoader();
	$.ajax({
		type: 'POST',
		async: false,
		url: jenjiUrl,
		data: {
			target:target
		},
		success: function(response) {
			hideLoader();
			window.open(populateJenjiUrl(response.data,origin,entityIds));
		}
	}); 
}

function populateJenjiUrl(partialUrl,origin,entityIds){
	var redirectionUrl=partialUrl;
	 if('CardSheet'===origin ||'StaffMemberSheet'===origin){
		var cards = entityIds.split(',');
		if(cards.length===1){
			redirectionUrl+='&CardPAN='+cards[0];
		} else {
		for(var i=0;i<cards.length;i++){
			redirectionUrl+='&CardPAN'+i+'='+cards[i];
			}
		}
	}
	 return redirectionUrl;
}

/****************************** GRANA - MULTIPASS CLIENT DUPLICATION TABEL ACCORDION  ****************************************/
var multipleClientListDT = null;
$(document).on('click', '.checkDuplication', function(){
	var value = this.value;
	toggleClientAccordionSection(value);
});
$(document).on('change', '#multipass-account-list .client_lists', function(){
	$('.showClientSelectionErr').hide();
	triggerClientCheckboxEvent();
});
$(document).on('click', '#check_all_clients', function(){  
    var checked = this.checked;
    toggleAllClientsCheckboxes(checked);
});
function initClientAccordion(parentEle, hierarchyJSON){
	duplicationAccordionClientLists(hierarchyJSON);
	$(parentEle).find('.accordion-item > .accordion_tab').each(function() {
		// Expand the active class accordion on load.
		if($(this).hasClass("active")) {
			$(this).siblings(".accordion_content").slideDown(200);
		}
	});
	$(parentEle).find(".accordion-item > .accordion_tab > .toggleIcons").on("click", function() {
		toggleClientAccordionContent(this);
	});
}
function toggleClientAccordionContent(contentEle) {
	var tabEle = $(contentEle).parent('.accordion_tab');
	if ($(tabEle).hasClass("active")) {
	  $(tabEle).removeClass("active");
	  $(tabEle).siblings(".accordion_content").slideUp(200);
	} else {
	  //$(".accordion-item > .accordion_tab").removeClass("active");
	  $(tabEle).addClass("active");
	  //$(".accordion_content").slideUp(200);
	  $(tabEle).siblings(".accordion_content").slideDown(200);
	}
}
function triggerClientCheckboxEvent(){
	var checkboxLength = 0, checkedLength = 0;
	multipleClientListDT.column(0).nodes().to$().each(function(index) {
		checkboxLength += $(this).find('.client_lists').length || 0;
		checkedLength += $(this).find('.client_lists:checked').length || 0;
    });
	$('#check_all_clients').prop('checked', (checkedLength == checkboxLength));
	$('.accordion-counter #selected_count').text(checkedLength)
	//multipleClientListDT.draw(false);
}
function toggleAllClientsCheckboxes(checked) {
	multipleClientListDT.column(0).nodes().to$().each(function(index) {
		$(this).find('.client_lists').prop('checked', checked);
    });
	//multipleClientListDT.draw(false);
	triggerClientCheckboxEvent();
}
function toggleClientAccordionSection(value) {
	$('.showClientSelectionErr').hide();
	if(value == "NO") $('.multipass-client-accordion-container').hide();
	else  $('.multipass-client-accordion-container').show();
}
function duplicationAccordionClientLists(hierarchyJSON) {
	var jsonData = prepareJSONData(hierarchyJSON.customerAccounts) || [];
	multipleClientListDT = $('#multipass-account-list')
	.on("processing.dt", function(n, t, i) {
		i ? showLoader() : hideLoader()
	}).DataTable({
		'searching' : !0,
		'lengthMenu' : [15],
		'bLengthChange' : false,
		'bInfo' : false,
		'autoWidth': false,
		oLanguage : {
			sZeroRecords : " ",
			sEmptyTable : " ",
			sSearch : "",
			oPaginate : {
				sNext : '<span class="label"><\/span> <i class="icon next"><\/i>',
				sPrevious : '<i class="icon prev"><\/i> <span class="label"><\/span>'
			}
		},
		data: jsonData,
		columns : [{
			data : "id",
				"render" : function(data, type, row) {
					var content = ''; 
					content += '<input id="clients_id_'+data+'" name="temp_clients" value="'+data+'" type="checkbox" class="checkbox-label align_left client_lists">'+
					'<label for="clients_id_'+data+'" class="css-label"></label>';
					return content;
				},
				targets : [ 0 ],
				className: 'client_list_checkboxes',
				sortable: false
			}, {
				data: "code",
				targets: [1],
			}, {
				data: "name",
				targets: [2]
			}],
		aaSorting: [[1, 'asc']],
	});
	DT_SearchWrapper('#multipass-account-list');
	DT_DropdownWrapper('#multipass-account-list');
}
function refactorMultipassSelectedClients() {
	if(multipleClientListDT) {
		$('.multipass-client-accordion-container #hiddenClientIDS').empty();
		multipleClientListDT.column(0).nodes().to$().each(function(index) {
			var ele = $(this).find('.client_lists')[0];			
		    if(ele.checked){
		        // Create a hidden element for selected clients:
		        $('.multipass-client-accordion-container #hiddenClientIDS').append(
		        	$('<input>')
		              .attr('type', 'checkbox')
		              .attr('name', 'selectedClients')
					  .attr('class', 'hiddenClientIdSelected')
					  .prop('checked', true)
		              .val(ele.value)
		        );
		        
		     }
		});
	}
}
function reInitalizeMultipassClientDT(hierarchyJSON) {
	if($.fn.DataTable.isDataTable('#multipass-account-list') ) {
	  	$('#multipass-account-list').DataTable().destroy();
		$('#multipass-account-list tbody').empty();
		duplicationAccordionClientLists(hierarchyJSON);
		triggerClientCheckboxEvent();
	}
	$("#duplicate_no").prop('checked', true);
	toggleClientAccordionSection($('.checkDuplication:checked').val());
	$('#check_all_clients').prop('checked', false);
	$('.showClientSelectionErr').hide();
}
function checkMultipassClientsSelection() {
	var clientNotSelected = ($('.checkDuplication:checked').val() == "YES" && $('.multipass-client-accordion-container #selected_count').text() == "0");
	$('.showClientSelectionErr').hide();
	if(clientNotSelected) {
		$('.showClientSelectionErr').show();
		return false;
	}
	return true;
}
/****************************** GRANA - MULTIPASS CLIENT DUPLICATION TABEL ACCORDION  ****************************************/