function removeBlindTheme() {
	$("link[href*=style-blind]").remove();
	$('link[href*=custom-blind]').remove();
	$('body').removeClass('theme-blind');
	document.cookie = "theme=default";
}

function addBlindTheme() {
	document.cookie = "theme=blind";
	if (_spPageContextInfo.webAbsoluteUrl.indexOf('en-us') > -1) {
		includeLink('css', '/Style%20Library/en-us/DCASBranding/css/style-blind.css');
		includeLink('css', '/Style%20Library/DCASBranding/css/custom-blind.css');
	}
	else {
		includeLink('css', '/Style%20Library/ar-sa/DCASBranding/css/style-blind.css');
		includeLink('css', '/Style%20Library/DCASBranding/css/custom-blind.css');
	}
	$('body').addClass('theme-blind');
}

if (getCookie('theme') == 'default') {
	removeBlindTheme();
} else if (getCookie('theme') == 'blind') {
	addBlindTheme();
} else if (getCookie('theme') == undefined) {
	console.log('Theme Undefine!');
}

$('#color-blind').click(function () {
	addBlindTheme();
});

$('#color-dcas').click(function () {
	removeBlindTheme();
});

$('#color-green').click(function () {

});


/*===================================
		COOKIE FUNCTIONS
=====================================*/
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

// cookie.js file
var cookieToday = new Date(); 
var expiryDate = new Date(cookieToday.getTime() + (365 * 86400000)); // a year

/* Cookie functions originally by Bill Dortsch */

function setCookie (name,value,expires,path,theDomain,secure) { 
   value = escape(value);
   var theCookie = name + "=" + value + 
   ((expires)    ? "; expires=" + expires.toGMTString() : "") + 
   ((path)       ? "; path="    + path   : "") + 
   ((theDomain)  ? "; domain="  + theDomain : "") + 
   ((secure)     ? "; secure"            : ""); 
   document.cookie = theCookie;
} 

function getCookie(Name) { 
   var search = Name + "=" 
   if (document.cookie.length > 0) { // if there are any cookies 
      var offset = document.cookie.indexOf(search) 
      if (offset != -1) { // if cookie exists 
         offset += search.length 
         // set index of beginning of value 
         var end = document.cookie.indexOf(";", offset) 
         // set index of end of cookie value 
         if (end == -1) end = document.cookie.length 
         return unescape(document.cookie.substring(offset, end)) 
      } 
   } 
} 
function delCookie(name,path,domain) {
   if (getCookie(name)) document.cookie = name + "=" +
      ((path)   ? ";path="   + path   : "") +
      ((domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}