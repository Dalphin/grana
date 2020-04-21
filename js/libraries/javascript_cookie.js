function create_cookie(name, value) {
  var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function SetCookieValue(key, value) {
	document.cookie = key + "=" + value;
}

function read_cookie(name) {
 var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
 result && (result = (typeof result[1] == 'object') ? JSON.parse(result[1]) : result[1]);
 return result;
}

function delete_cookie(name) {
  document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}

function GetCookieValue(key) {
	var value = null;
	var cookieArray = document.cookie.split(';');
	for (var i = 0; i < cookieArray.length; i++) {
		var keyValuePair = cookieArray[i].split("=");
		if (keyValuePair[0] == key) {
			value = keyValuePair[1];
			break;
		}
	}
	console.log(value, " Value ");
	return value;
}

function checkCookie(name) {
    var cookie = read_cookie(name);
    if (cookie == null) {
        initCookie();
    } else {
    	if(window.location.hostname.indexOf('fleetonline') == -1) { 
    		read_cookie('offset');
    		read_cookie('culture');
    	} else {
    		GetCookieValue('offset');
    		GetCookieValue('culture');
    	}
    }
}
//create_cookie('locale_settings', {"offset":new Date().getTimezoneOffset(), "culture": window.navigator.language});
function initCookie() {
		SetCookieValue('offset', new Date().getTimezoneOffset());
		SetCookieValue('culture', 'fr-FR');
	
}
initCookie();