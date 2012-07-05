//= require gko_store_public_all
//= jquery.easing.1.3
//= require jquery.scrollTo.1.4.2
//= require jquery.inview
//= require jquery.scrollParallax
//= require jquery.sidescroll.js
//= require jquery.mousewheel.3.0.6
//= require jquery.gridnav
//= require galleria/galleria
//= require history/scripts/bundled/html5/jquery.history.js
$(document).ready(function() {


	f_init_carousel = function() {
		$('.carousel').each(function(index) {
			var _self = $(this);
			if(_self.find('.item').length > 1) {
				_self.carousel('pause');
			} else {
				_self.find('.carousel-control').each(function(index) {
					  $(this).css({display: 'none'})
				 });
			}
		});
    }
	f_showCartUpdateNotice = function(action) {
		
		var o = $viewCartMenuLink.position();
		if($notice === undefined) {
			console.log($viewCartMenuLink)
			$notice = $("<div class='notice'>Your selection has been updated !</div>").appendTo($body);
			$notice.css({'display': 'none','position': 'fixed', 'z-index' : 10000, 'left' : o.left, 'top': o.top + 50, 'background-color': 'green', 'color': 'white', 'padding': 8})
		}	
		$notice.fadeIn('slow', function() {
			window.setTimeout(f_hideCartUpdateNotice, 2000);
		});
	}
	f_hideCartUpdateNotice = function () {
		$notice.fadeOut('slow');
	}
	f_refresh_ui = function() {
		var viewport = f_viewport_wh();
		
		headerHeight = $(".navbar:first").height();
		footerHeight = $("#footer-container").height();
		deltaHeight = headerHeight + footerHeight;
		
		var h = viewport.h - deltaHeight;
		//$container.css('padding-top', $('.navbar').height())
		
		$('section.fullscreen, .parallax-item').css({'height': h, 'width': viewport.w});
		$.each($('.centered'), function(index, item) {
			var that = $(this)
				,row = that.find('.row-fluid:first');

			if(row.length) {
				row.css({'position': 'absolute','top': '50%', 'margin-top': - row.height()/2,'left': '50%', 'margin-left': - row.width()/2})
			}
		});
		$.each($('.parallax .headline'), function(index, item) {
			var that = $(this)
				,top = (h - that.height())/2;
				
			top = (top < 0) ? 0 : top;
			that.css('margin-top', top);
		});
		
		gridRowCount = Math.floor( (h - 48) / gridItemHeight );
		gridColCount = Math.floor( (viewport.w - 48) / gridItemHeight );
		var gridHeight = gridRowCount * gridItemHeight + 50,
			gridWidth = gridColCount * gridItemHeight;
		$.each($('.tj_wrapper'), function(index, item) {
			$(this).css({
				marginTop: - (gridHeight / 2),
				height: gridHeight,
				marginLeft: - (gridWidth / 2),
				width: gridWidth,
			})
		});
		
		
    }

	f_show_category = function(target) {
		if(target.hasClass('active')) {
			return false;
		} else {
			var id = target.attr('id');
			$("section").removeClass('active').show();
			History.pushState({state: "category"}, id, '?category="' + id + '"');
			$body.scrollTo(target.offset().top - headerHeight, { duration:500, axis:'y'});
		}
	}
	f_show_product = function(item, response) {
		var $next = item.next();
		
		$next.find(".content:first").html(response);

		$body.scrollTo( item.offset().top - headerHeight, { duration:500, axis:'y', onAfter:function() {
			item.animate({'left': -windowSize.width}, 900);
			$next.css('left', windowSize.width).addClass('active').animate({'left': 0}, 900, function(){
				f_init_carousel();
				$('form.cart-form').attr('data-remote', 'true');
			});
		}});
	}
	f_hide_product = function(item) {
		f_refresh_ui();
		var $next = item.prev();
			$next.addClass('active').animate({'left':0}, 900);
			item.animate({'left': windowSize.width}, 900);
	}
	f_show_products = function(section) {
		f_refresh_ui();
		var $current = section.find(".parallax-item:first")
			,$next = $current.next();
		$body.scrollTo( section.offset().top - headerHeight, { duration:500, axis:'y', onAfter:function() {
			$next.css('left', windowSize.width).addClass('active');
			f_init_grid();
			$current.animate({'left': -windowSize.width}, 900);
			$next.animate({'left': 0}, 900);
		}});
	}
	f_hide_products = function(section) {
		f_refresh_ui();
		var $parallaxInner = section.find(".parallax-inner:first")
			,$parallaxItem = section.find(".parallax-item:first");
		$current = $parallaxItem.next();
		$parallaxItem.animate({'left':0}, 900);
		$current.animate({'left': windowSize.width}, 900);
	}
	f_init_events = function() {	
        $(window).on("throttledresize",
        function(e) {
			windowSize.width = $window.width();
			windowSize.height = $window.height();
            f_refresh_ui();
        });
	
        $(".pod")
		.on('click', 'a', function(e) {
			e.stopPropagation();
            e.preventDefault();
			f_show_products($(this).closest("section"));
        });

		$('#tresors-au-fil-du-rivage').on('click', function(e) {
			e.stopPropagation();
            e.preventDefault();
			f_show_category($("section#treasure"));
		})

		$('#perles-noires-de-tahiti').on('click', function(e) {
			e.stopPropagation();
            e.preventDefault();
			f_show_category($("section#pearl"));
		})

		$('.products').on('click', ' a.back', function(e) {
			e.stopPropagation();
            e.preventDefault();
			f_hide_products($(this).closest("section"));
		})
		$('.product').on('click', ' a.back', function(e) {
			e.stopPropagation();
            e.preventDefault();
			f_hide_product($(this).closest(".parallax-item"));
		})
		// Bind cart form
		$('.product').on('ajax:beforeSend', 'form.cart-form',
		function(event, xhr, settings) {
			
		}).on('ajax:complete',
        function(evt, xhr, status) {
			f_showCartUpdateNotice();
        });
		// Bind show product action
        $(".tj_gallery a").attr('data-remote', 'true')
		.on('ajax:beforeSend', function(event, xhr, settings) {

		})
		.on('ajax:complete',
        function(evt, xhr, status) {
			f_show_product($(this).closest(".parallax-item"), eval(xhr.responseText).html());
        });
	}
	f_init_grid = function() {
		
		$('.tj_container').gridnav({
			rows: gridRowCount,
			type : {
				
				mode		: 'seqfade', 	// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
				speed		: 500,			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
				easing		: '',			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows	
				factor		: 100,			// for seqfade, sequpdown, rows
				reverse		: ''			// for sequpdown
			}
		});
	}
	f_init_home_page = function() {
		$('.parallax').scrollParallax({'speed': -0.2, 'axis' : 'y'});
		$sidescroll.init();
		var $headline = $('.headline:first')
			,$logo = $("#logo")
			,$navbar = $(".navbar:first");
		$navbar.css('top', -50);
		$body.fadeIn(2000, function() {
			$logo.animate({'opacity': 1}, 1200, function() {
				$headline.css({'opacity': 1, 'textShadow':'#ffffff 10 10 600'}).animate({textShadow: "0 0 50 #ffffff"}, 1000);
			});
			$navbar.animate({'top':0}, 200);
		});
	}
	f_init_history = function() {
	    if ( !History.enabled ) {
	         // History.js is disabled for this browser.
	         // This is because we can optionally choose to support HTML4 browsers or not.
	        return false;
	    }

	    // Bind to StateChange Event
	    History.Adapter.bind(window,'statechange',function(){
	        var State = History.getState();
	        History.log(State.data, State.title, State.url);
			if(State.data.state == "category") {
				//var hashOptions = $.deparam.fragment();
			//	console.log(hashOptions)
			}
	    });	
	}
	f_init = function() {
		windowSize.width = $window.width();
		windowSize.height = $window.height();
		if(bodyId == 'home') {
			f_init_carousel();
			f_refresh_ui();
			f_init_events();
			f_init_history();
			f_init_home_page();
			f_refresh_ui();
			
		}
		else {
			if($('.galleria').length > 0) {
			    Galleria.loadTheme('/assets/galleria.classic.js');
			    Galleria.run('.galleria', {
					autoplay: true,
					responsive: true,
					height: 0.75,
					imageCrop: 'landscape',
					transition: 'flash',
					thumbMargin: 10,
					showCounter: false,
					showInfo: false
				});
			}
			$body.fadeIn(2000);
		}

	}
	
	var  $body = $("body")
		,$html = $("html")
		,$window = $(window)
		,gridColCount = 3
		,gridRowCount = 2
		,gridItemHeight = 300 //including margin and padding
		,headerHeight = $(".navbar:first").height()
		,footerHeight = $("#footer-container").height()
		,deltaHeight = headerHeight + footerHeight
		,$current
		,$notice
		,$viewCartMenuLink = $('a#view-cart-menu-link')
		,bodyId = $body.attr('id')
		,windowSize = {}// we will store the window sizes here
		,isResizing = false
		,History = window.History; // Note: We are using a capital H instead of a lower h

		
	f_init(); 
});