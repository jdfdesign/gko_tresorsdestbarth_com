//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap/carousel
//= require twitter/bootstrap/modal
//= require gko_store_public_all

var isMac, deviceAgent, isApple;

$(document).ready(function() {
    
	isMac = navigator.platform.toUpperCase().indexOf('MAC')!==-1; 
	deviceAgent = navigator.userAgent.toLowerCase();
	isApple = deviceAgent.match(/(iphone|ipod|ipad)/);
	
	f_init = function() {
		$overlay.fadeOut();
	}
	
	var  $body = $("body")
		,$html = $("html")
		,$window = $(window)
		,$overlay = $("#overlay");

		
	f_init(); 
});