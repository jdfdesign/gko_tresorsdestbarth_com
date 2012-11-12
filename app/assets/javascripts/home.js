//= require gko_store_public_all
//= jquery.easing.1.3
//= require jquery.scrollTo.1.4.2
//= require jquery.inview
//= require jquery.scrollParallax
//= require jquery.sidescroll.js
//= require jquery.mousewheel.3.0.6
//= require jquery.debouncedresize.js
//= require jquery.gridnav
//= require gko/gko.galleria

//= require jquery.jscrollpane
$(document).ready(function() {

	f_scroll_to_section = function(section, callback) {
		var index = section.index('section');
		contentApi.data('jsp').scrollToY( availableHeight * index );
    }
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
	f_enable_main_scroll = function(trueOrFalse) {
		if(trueOrFalse) {
			contentApi.data('jsp').enable(true);
			$container.find(".jspVerticalBar").show();
		} else {
			// Disable the main scroll
			$container.find(".jspVerticalBar").hide();
			contentApi.data('jsp').enable(false);
		}
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
	f_getViewportSize = function () {
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
	f_getAvailableSpace = function () {
		var viewportSize = f_getViewportSize(),
			deltaHeight = headerHeight + footerHeight;
		availableHeight = viewportSize.height - (headerHeight + footerHeight)
		availableWidth = viewportSize.width;
	}
	f_refresh_ui = function() {
		

		$('.fullscreen').css({'height': availableHeight});
		$.each($('.parallax .headline'), function(index, item) {
			var that = $(this)
				,top = (availableHeight - that.height())/2;
				
			top = (top < 0) ? 0 : top;
			that.css('margin-top', top);
		});
		
		if(contentApi != undefined) {
		//	console.log("f_refresh_ui contentApi");
			$container.css('height', availableHeight);
			contentApi.data('jsp').reinitialise();
		}
		
		$('.grid').each(function (i, el) {
			$(el).gridnav('init');
		});
    }
	f_show_category = function(section) {
		
		if($activeSection == undefined) {
			f_scroll_to_section(section);
		}
		else {
		//	console.log("// f_show_category " + section.attr("id"));
			var activeSectionId = $activeSection.attr('id'),
				sectionId = section.attr('id'),
				activeSectionState = $activeSection.attr('data-state');
		//	console.log("// activeSection state: " + activeSectionState);
			
			$activeSection.attr('data-state', 'category');	
				
			if(activeSectionState == 'category') {
				//console.log("// category: ");
				f_scroll_to_section(section, null);
			}
			else if(activeSectionState == "product") {
				//console.log("// product: ");
				var $category = $activeSection.find(".category:first"),
					$grid = $activeSection.find('.products:first'),
					$product = $activeSection.find('.product:first');
					$product.animate({'left': availableWidth}, 900, function() {
						$(this).removeClass('active');
					});
					$grid.addClass('active').animate({'left':availableWidth}, 1800, function() {
						$(this).removeClass('active');
					});
					$category.addClass('active').animate({'left':0}, 2700, function() {
						f_enable_main_scroll(true);
						f_scroll_to_section(section, false);
					});
			}
			else if(activeSectionState == "grid") {
				//console.log("// grid: ");
				var $category = section.find(".category:first"),
					$grid = section.find('.products:first');
					$grid.addClass('active').animate({'left':availableWidth}, 900, function() {
						$(this).removeClass('active');
					});
					$category.addClass('active').animate({'left':0}, 1800, function() {
						f_enable_main_scroll(true);
						//console.log("// gridccccccc: ");
						f_scroll_to_section(section, false);
					});
			}
		}
		$activeSection = section;
	}
	f_show_product = function(section, response) {
		var $grid = section.find('.products:first'),
			$product = section.find('.product:first'),
			$content = $product.find(".content:first");

		$content.html(response);
		var $carousel = $content.find('.carousel:first'),
			$info = $content.find('.product-info:first'),
			infoWidth = 300,
			inforMargin = 30,
			maxCarouselHeight = availableHeight - 120,
			maxCarouselWidth = availableWidth - 240 - infoWidth - inforMargin,
			maxCarousel = Math.min(maxCarouselWidth, maxCarouselHeight);
			
			//console.log("availableWidth " + availableWidth)

		$carousel.css({'max-height': maxCarousel, 'max-width': maxCarousel});
		$info.css({'height': maxCarouselHeight});
		
		$('form.cart-form').attr('data-remote', 'true');
		section.attr('data-state', 'product');
		$grid.animate({'left': -availableWidth}, 900, function(){
			$(this).removeClass('active')
		});
		$product.css('left', availableWidth).addClass('active').animate({'left': 0}, 900, function(){
			f_init_carousel();
			$info.jScrollPane();
		});
		
	}
	f_hide_product = function(section, callback) {
	//	f_refresh_ui();
		var $grid = section.find('.products:first'),
			$product = section.find('.product:first');
			$grid.addClass('active').animate({'left':0}, 900);
			$product.animate({'left': availableWidth}, 900, function() {
				$(this).removeClass('active');
				if( typeof callback == "function") {
					$(callback)
				}
			});
			section.attr('data-state', 'grid');
	}
	f_show_grid = function(section, callback) {
		//console.log("// f_show_grid");
		$activeSection = section;
		//f_scroll_to_section(section, f_show_grid_after);
		f_scroll_to_section(section);
		//console.log("// f_show_grid_after");
		var $category = $activeSection.find(".category:first"),
			$products = $activeSection.find(".products:first");
			
			//console.log("XXXXXXX f_show_grid" + $category);
			
		$activeSection.attr('data-state', 'grid');
		
		$products.css('left', availableWidth).addClass('active');
		f_init_grid($products);
	
		$category.animate({'left': -availableWidth}, 900, function() {
			$(this).removeClass('active');
			f_enable_main_scroll(false);
		});
		$products.animate({'left': 0}, 900);
	}

	f_hide_grid = function(section) {
		//console.log("// f_hide_grid " + section.attr("id"));
		var $category = section.find(".category:first"),
			$products = section.find(".products:first");
		section.attr('data-state', 'category');
		$category.addClass('active').animate({'left':0}, 900);
		$products.animate({'left': availableWidth}, 900, function() {
			//console.log("// f_hide_grid " + availableWidth);
			f_enable_main_scroll(true);
		});
	}
	f_init_events = function() {	
        $(window).on("debouncedresize",
        function(e) {
			f_getAvailableSpace(); // update space infos before all
            f_refresh_ui();
			if($activeSection) {
				f_scroll_to_section($activeSection);
			}
			
        });
	
        $(".pod")
		.on('click', 'a', function(e) {
			e.stopPropagation();
            e.preventDefault();
			f_show_grid($(this).parents("section:first"));
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
			f_hide_grid($(this).parents("section:first"));
		})
		$('.product').on('click', ' a.back', function(e) {
			e.stopPropagation();
            e.preventDefault();
			f_hide_product($(this).parents("section:first"));
		})
		// Bind cart form
		$('.product').on('ajax:beforeSend', 'form.cart-form',
		function(event, xhr, settings) {
			
		}).on('ajax:complete',
        function(evt, xhr, status) {
			f_showCartUpdateNotice();
        });
		// Bind show product action
        $(".tj_gallery_inner").hover(function(e) {
			var t = $(this).find(".tj_content:first");
			t.css('right', 0);
		}, function(e) {
			var t = $(this).find(".tj_content:first");
			t.css('right', -t.width());
		})
		.on('ajax:beforeSend', function(event, xhr, settings) {

		})
		.on('ajax:complete',
        function(evt, xhr, status) {
			f_show_product($(this).parents("section:first"), eval(xhr.responseText).html());
        });
		// Bind lookbook action
		$("a#lookbook").attr('data-remote', 'true')
		.on('ajax:beforeSend',
		function(event, xhr, settings) {

		}).on('ajax:complete',
	    function(evt, xhr, status) {

			var modal = $("#modal-gallery"),
				header = modal.find('.modal-header:first'),
				body = modal.find('.modal-body:first'),
				gallery = modal.find('.galleria:first'),
				headerHeight = header.height(),
				bodyMaxHeight = availableHeight - headerHeight  - 30,
				modalHeight = availableHeight + headerHeight,
				modalWidth = modalHeight * 1.35;
			
			body.css({'max-height': bodyMaxHeight });
			modal.css({'margin-top': -modalHeight/2, 'margin-left': -modalWidth/2, 'width': modalWidth, 'height': modalHeight});
			gallery.galleria({
	            autoplay: true,
	            responsive: true,
	            height: .65,
				carousel: false,
			//	thumbnails: "numbers",
	            imageCrop: 'landscape',
	            transition: 'flash',
	            showCounter: false,
	            showInfo: false
	        })
	    });

	}
	f_init_grid = function(target) {
		var grid = target.find('.tj_container:first');
		if(grid.hasClass('grid')) {
			return false;
		} else {
			grid.addClass('grid').gridnav({
				type : {
					mode		: 'seqfade', 	// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
					speed		: 500,			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
					easing		: '',			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows	
					factor		: 100,			// for seqfade, sequpdown, rows
					reverse		: ''			// for sequpdown
				}
			});	
		}
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
	       // History.log(State.data, State.title, State.url);
			if(State.data.state == "category") {
				//var hashOptions = $.deparam.fragment();
			//	console.log(hashOptions)
			}
	    });	
	}
	f_loading_done = function() {
		if(imagesCount == 0) {
			f_getAvailableSpace(); // update space infos before all
			f_refresh_ui();
			f_init_events();
			f_init_carousel();
			$sidescroll.init();
			f_do_animation();
			// Temporarily make the container tiny so it doesn't influence the
			// calculation of the size of the document
			$container.css({'width': 1,'height': 1});
			// Now make it the size of the window...
			$container.css({'width': availableWidth,'height': availableHeight});
			// Enable jscrollpane				
			contentApi = $container.jScrollPane({animateScroll: true, animateDuration: 700});
			/*contentApi.on(
				'complete', function(event) {
					if( typeof callback == "function") {
						callback();
					}
				}
			)*/
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
	f_init_galleria = function() {

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
	f_init = function() {
		
		f_images_loaded();
		f_init_galleria();
	}
	
	var  $body = $("body")
		,$html = $("html")
		,$window = $(window)
		,$overlay = $("#overlay")
		,$container = $("#content") 
		,$cover = $("#cover")
		,$logo = $("#logo")
		,$navbar = $(".navbar:first")
		,$activeSection
		,contentApi
		,imagesCount = 0
		,gridColCount = 3
		,gridRowCount = 2 
		,gridItemHeight = 300 //including margin and padding
		,headerHeight = $(".navbar:first").height()
		,footerHeight = $("#footer-container").height()
		,deltaHeight = headerHeight + footerHeight
		,availableHeight
		,availableWidth
		,$notice
		,$viewCartMenuLink = $('a#view-cart-menu-link')
		,bodyId = $body.attr('id')
		,isHome = (bodyId == "home")
		,History = window.History; // Note: We are using a capital H instead of a lower h

		
	f_init(); 
});