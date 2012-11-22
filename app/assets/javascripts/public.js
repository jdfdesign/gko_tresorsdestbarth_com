//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap/carousel
//= require twitter/bootstrap/modal
//= require gko_store_public_all

var  $body
	,$html
	,$window
	,$overlay
	,bodyId
	,isHome

var Site = {

	init: function() {
		$body = $("body");
		$html = $("html");
		$window = $(window);
		$overlay = $("#body-overlay");
		bodyId = $body.attr('id');
		isHome = (bodyId == "home");
		
		if(isHome) {
			Home.init();
		} else {
			$('a[href$="#treasures"]').attr("href", "/#treasures");
			$('a[href$="#pearls"]').attr("href", "/#pearls");
			$overlay.fadeOut();
		}
	}
}
				
$(document).ready(function() {
	Site.init(); 
});