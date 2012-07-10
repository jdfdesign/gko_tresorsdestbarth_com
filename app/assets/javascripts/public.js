//= require gko_store_public_all
//= jquery.easing.1.3
//= require jquery.scrollTo.1.4.2
//= require jquery.inview
//= require jquery.scrollParallax
//= require jquery.sidescroll.js
//= require jquery.mousewheel.3.0.6
//= require jquery.gridnav
//= require gko/gko.galleria
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
		var viewport = f_viewport_wh(),
			coverHeight = $cover.height();
		
		headerHeight = $(".navbar:first").height();
		footerHeight = $("#footer-container").height();
		deltaHeight = headerHeight + footerHeight;
		
		var h = viewport.h - deltaHeight;
		
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
		
	/*	if(coverHeight > h) {
			var newLogoHeight = coverHeight - h - 80,
				newLogoWidth = newLogoHeight * logoRatio;
				
				console.log(newLogoHeight + "  " + h)
			$logo.css({'height': newLogoHeight, 'width': newLogoWidth});
		}
		else {
			$logo.css({'height': originalLogoHeight, 'width': originalLogoWidth})
		} */
		$cover.css('height', h);
		
		
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
	f_do_animation = function() {
		if(isHome) {
			var $headline = $cover.find('.headline');
			$headline.css('opacity', 0);
			$logo.css('opacity', 0);
			$navbar.css('top', -50);
			$overlay.fadeOut(2000, function() {
				$overlay.remove();
				$logo.animate({'opacity': 1}, 1200, function() {
					$headline.css({'opacity': 1, 'textShadow':'#ffffff 10 10 600'}).animate({textShadow: "0 0 50 #ffffff"}, 1000);
				});
				$navbar.animate({'top':0}, 200);
			});
		} else {
			$overlay.fadeOut(2000);
		}
		
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
	f_loading_done = function() {
		if(imagesCount == 0) {
			//console.log(imagesCount + " loaded");
			f_refresh_ui();
			f_init_events();
			f_init_history();
			f_init_carousel();
			$('.parallax').scrollParallax({'speed': -0.2, 'axis' : 'y'});
			$sidescroll.init();
			f_do_animation();
		}
	}
	f_images_loaded = function() {
		$('section.background-image').each(function (i, el) {
			imagesCount ++;
			var bg = $(el).css('background-image'),
				src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
				$('<img>').attr('src', src).on('load', function() {
		        imagesCount --;
		        f_loading_done();
			});
		});
	}
	f_init = function() {
		windowSize.width = $window.width();
		windowSize.height = $window.height();
		if(isHome) {
			f_images_loaded();

		}
		else {
			if($('.galleria').length > 0) {
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
			
		}

	}
	
	var  $body = $("body")
		,$html = $("html")
		,$window = $(window)
		,$overlay = $("#overlay")
		,$cover = $("#cover")
		,$logo = $("#logo")
		,$navbar = $(".navbar:first")
		,imagesCount = 0
		,originalLogoWidth = $logo.width()
		,originalLogoHeight = $logo.height()
		,logoRatio = originalLogoWidth / originalLogoHeight
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
		,isHome = (bodyId == "home")
		,windowSize = {}// we will store the window sizes here
		,isResizing = false
		,History = window.History; // Note: We are using a capital H instead of a lower h

		
	f_init(); 
});