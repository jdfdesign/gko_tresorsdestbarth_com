//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap/transition.js
//= require twitter/bootstrap/alert.js
//= require twitter/bootstrap/button.js
//= require twitter/bootstrap/carousel.js
//= require twitter/bootstrap/collapse.js
//= require twitter/bootstrap/dropdown.js
//= require load-image.js
//= require twitter/bootstrap/modal.js
//= require bootstrap-image-gallery.js
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
		
		if(!$body.hasClass('mobile-device')) {
			// Change categories links to redirect to homePage
			$('a#treasures').attr("href", "/#category_treasures");
			$('a#pearls').attr("href", "/#category_pearls");
		}
		
		if(isHome && !$body.hasClass('mobile-device')) {
			Home.init();
		} else {
			$overlay.fadeOut();
		}

		// Bind lookbook action
		$("a#lookbook").attr('data-remote', 'true')
		.on('click', function(e){
			var gallery = $("#gallery");
			if(gallery.length === 1) {
				e.stopPropagation();
	            e.preventDefault();
				$('#gallery a:first').click();
			}
		})
		.on('ajax:beforeSend',
		function(event, xhr, settings) {

		}).on('ajax:complete',
	    function(evt, xhr, status) {

	    });
	}
}

var SlideShow = {

		init : function() {

			 Galleria.addTheme({
			        name:'classic',
			        author:'Galleria',
			        css:'galleria.classic.css',
			        defaults:{
			            transition:'slide',
			            thumbCrop:'height',

			            // set this to false if you want to show the caption all the time:
			            _toggleInfo:false
			        },
			        init:function (options) {

			            // add some elements
			            this.addElement('info-link', 'info-close');
			            this.append({
			                'info':['info-link', 'info-close']
			            });

			            // cache some stuff
			            var info = this.$('info-link,info-close,info-text'),
			                touch = Galleria.TOUCH,
			                click = touch ? 'touchstart' : 'click';

			            // show loader & counter with opacity
			            this.$('loader,counter').show().css('opacity', 0.4);

			            // some stuff for non-touch browsers
			            if (!touch) {
			                this.addIdleState(this.get('image-nav-left'), { left:-50 });
			                this.addIdleState(this.get('image-nav-right'), { right:-50 });
			                this.addIdleState(this.get('counter'), { opacity:0 });
			            }

			            // toggle info
			            if (options._toggleInfo === true) {
			                info.bind(click, function () {
			                    info.toggle();
			                });
			            } else {
			                info.show();
			                this.$('info-link, info-close').hide();
			            }

			            // bind some stuff
			            this.bind('thumbnail', function (e) {

			                if (!touch) {
			                    // fade thumbnails
			                    $(e.thumbTarget).css('opacity', 0.6).parent().hover(function () {
			                        $(this).not('.active').children().stop().fadeTo(100, 1);
			                    }, function () {
			                        $(this).not('.active').children().stop().fadeTo(400, 0.6);
			                    });

			                    if (e.index === this.getIndex()) {
			                        $(e.thumbTarget).css('opacity', 1);
			                    }
			                } else {
			                    $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
			                }
			            });

			            this.bind('loadstart', function (e) {
			                if (!e.cached) {
			                    this.$('loader').show().fadeTo(200, 0.4);
			                }

			                this.$('info').toggle(this.hasInfo());

			                $(e.thumbTarget).css('opacity', 1).parent().siblings().children().css('opacity', 0.6);
			            });

			            this.bind('loadfinish', function (e) {
			                this.$('loader').fadeOut(200);
			            });
			        }
			    });
		}
}


var Util = {

	availableSpace: function() {
		headerHeight = $(".navbar:first").height();
		footerHeight = $("#footer-container").height();
		var viewportSize = Util.viewportSize(),
			deltaHeight = headerHeight + footerHeight;
		availableHeight = viewportSize.height - (headerHeight + footerHeight)
		availableWidth = viewportSize.width;
	},
	viewportSize: function () {
		var mode, domObject, size = { height: $window.innerHeight(), width: $window.innerWidth() };
		// if this is correct then return it. iPad has compat Mode, so will
		// go into check clientHeight/clientWidth (which has the wrong value).
		if (!size.height) {
			mode = document.compatMode;
			if (mode || !$.support.boxModel) { // IE, Gecko
				domObject = mode === 'CSS1Compat' ?
				document.documentElement : // Standards
				document.body; // Quirks
				size = {
					height: domObject.clientHeight,
					width:  domObject.clientWidth
				};
      		}
    	}
		return size;
	}
}
		
$(document).ready(function() {
	Site.init(); 
});