//= jquery.easing.1.3
//= require jquery.scrollTo.1.4.2
//= require jquery.inview
//= require jquery.sidescroll.js
//= require jquery.mousewheel.3.0.6
//= require jquery.debouncedresize.js
//= require jquery.gridnav
//= require gko/gko.galleria
//= require jquery.jscrollpane

var  $container
	,$cover
	,$logo
	,$navbar
	,$activeSection
	,imagesCount = 0
	,gridColCount = 3
	,gridRowCount = 2 
	,gridItemHeight = 300 //including margin and padding
	,headerHeight
	,footerHeight
	,deltaHeight
	,availableHeight
	,availableWidth
	,isAppleDevice
	,$notice
	,$viewCartMenuLink
	,History = window.History; // Note: We are using a capital H instead of a lower h
	
var Home = {
	
	init: function() {
		$container = $("#content");
		$cover = $("#cover");
		$logo = $("#logo");
		$navbar = $(".navbar:first");
		headerHeight = $(".navbar:first").height();
		footerHeight = $("#footer-container").height();
		deltaHeight = headerHeight + footerHeight;
		$viewCartMenuLink = $('a#view-cart-menu-link');
		var agent = navigator.userAgent.toLowerCase()
		isAppleDevice = agent.match(/(iphone|ipod|ipad)/);
		
		if(isAppleDevice) {
			$('section.background-image').css('background-attachment', 'absolute');
		}
		
		$('section.background-image').each(function (i, el) {
			imagesCount ++;
			var bg = $(el).css('background-image'),
				src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
				$('<img>').attr('src', src).on('load', function() {
		        imagesCount --;
		        Home.onImageLoaded();
			});
		});
	},
	onImageLoaded: function() {
		if(imagesCount == 0) {
			Util.availableSpace(); // update space infos before all
			Home.resize();
			Home.attachEvents();
			$sidescroll.init();

			// Temporarily make the container tiny so it doesn't influence the
			// calculation of the size of the document
		//	$container.css({'width': 1,'height': 1});
			// Now make it the size of the window...
			$container.css({'width': "100%",'height': availableHeight});
			
			
			var $headline = $cover.find('.headline');
			$headline.css('opacity', 0);
			$logo.css('opacity', 0);
			$navbar.css('top', -50);
			$overlay.fadeOut(3000, function() {
				$overlay.remove();
				$logo.animate({'opacity': 1}, 1200, function() {
					$headline.css({'opacity': 1, 'textShadow':'#ffffff 10 10 600'}).animate({textShadow: "0 0 50 #ffffff"}, 1000);
				});
				$navbar.animate({'top':0}, 200);
			});

		}
	},
	attachEvents: function() {
        $(window).on("debouncedresize",
        function(e) {
			Home.resize();
        });
	
        $(".category")
		.on('click', function(e) {
			e.stopPropagation();
            e.preventDefault();
			Grid.show($(this).parents("section:first"));
        });

		$('a[href$="#treasures"]').attr("id", "").on('click', function(e) {
			e.stopPropagation();
            e.preventDefault();
			Category.show($("section#treasures"));
		})

		$('a[href$="#pearls"]').attr("id", "").on('click', function(e) {
			e.stopPropagation();
            e.preventDefault();
			Category.show($("section#pearls"));
		})

		$('.products').on('click', ' a.back', function(e) {
			e.stopPropagation();
            e.preventDefault();
			Grid.hide($(this).parents("section:first"));
		})
		$('.product').on('click', ' a.back', function(e) {
			e.stopPropagation();
            e.preventDefault();
			Product.hide($(this).parents("section:first"));
		}).on('ajax:beforeSend', 'form.cart-form',
		function(event, xhr, settings) {
			
		}).on('ajax:complete',
        function(evt, xhr, status) {
			Home.showCartUpdateNotice();
        });

		
		// Bind show product action
        $(".tj_gallery_inner").hover(function(e) {
			$(".tj_content", this).animate({right: "0"},{queue:false, duration:300});  
		}, function(e) {
			var t = $(".tj_content");
			t.animate({right: -t.width()},{queue:false, duration:300});  
		})
		.on('ajax:beforeSend', function(event, xhr, settings) {

		})
		.on('ajax:complete',
        function(evt, xhr, status) {
			Product.show($(this).parents("section:first"), eval(xhr.responseText).html());
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

	},
	resize: function() {

		Util.availableSpace(); // update space infos before all
		$('.fullscreen').css({'height': availableHeight, 'width': availableWidth});
		$.each($('.parallax .headline'), function(index, item) {
			var that = $(this)
				,top = (availableHeight - that.height())/2;
				
			top = (top < 0) ? 0 : top;
			that.css('margin-top', top);
		});
		// center vercally the logo
		$logo.css('margin-top', (availableHeight - $logo.height()) / 2)
		
		$('.products').each(function (i, el) {
			Grid.resize($(el));
		});
		
		$('article.product').each(function (i, el) {
			Product.resize($(el));
		});

		if($activeSection) {
			Home.scrollToSection( $activeSection );
		}
	},
	scrollToSection: function(section) {
		$('html, body').animate({scrollTop: section.position().top}, 500);
	},
	showCartUpdateNotice: function() {
		
		var o = $viewCartMenuLink.position();
		if($notice === undefined) {

			$notice = $("<div class='notice'>Your selection has been updated !</div>").appendTo($body);
			$notice.css({'display': 'none','position': 'fixed', 'z-index' : 10000, 'left' : o.left, 'top': o.top + 50, 'background-color': 'green', 'color': 'white', 'padding': 8})
		}	
		$notice.fadeIn('slow', function() {
			window.setTimeout(Home.hideCartUpdateNotice, 2000);
		});
	},
	hideCartUpdateNotice: function() {
		$notice.fadeOut('slow');
	},
	onHashChange: function() {
		var hash = location.hash;
 		// Set the page title based on the hash.
		// document.title = 'The hash is ' + ( hash.replace( /^#/, '' ) || 'blank' ) + '.';
	}
}
var Product = {
	
	show: function(section, response) {
		var $grid = section.find('.products:first'),
			$product = section.find('.product:first'),
			$content = $product.find(".content:first");

		$content.html(response);
		var $article = $content.find("article:first"),
			$info = $article.find('.product-info:first'),
			$carousel = $article.find('.carousel:first');
		
		Product.size($article);
		
		$('form.cart-form').attr('data-remote', 'true');
		section.attr('data-state', 'product');
		
		$grid.animate({'left': -availableWidth}, 900, function(){
			$(this).removeClass('active')
		});
		$product.css('left', availableWidth).addClass('active').animate({'left': 0}, 900, function(){
			Product.initCarousel($carousel);
			$info.jScrollPane();
		});
	},
	hide: function(section) {

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
	},
	size: function(article) {
		var $carousel = article.find('.carousel:first'),
			$info = article.find('.product-info:first'),
			minInfoWidth = 300,
			infoMargin = 30,
			maxWidth = article.width(),
			maxCarouselHeight = availableHeight - 120,
			maxCarouselWidth = maxWidth - minInfoWidth - infoMargin,
			maxCarousel = Math.min(maxCarouselWidth, maxCarouselHeight);
			maxInfoWidth = maxWidth - maxCarousel - infoMargin;

		$carousel.css({'max-height': maxCarousel, 'max-width': maxCarousel});
		$info.css({'height': maxCarouselHeight, 'width': maxInfoWidth});
	},
	resize: function(article) {
		var $info = article.find('.product-info:first');
		Product.size(article);
		$info.data('jsp').reinitialise();
	},
	initCarousel: function(carousel) {
		if(typeof carousel != 'undefined') {
			if(carousel.find('.item').length > 1) {
				carousel.carousel('pause');
			} else {
				carousel.find('.carousel-control').each(function(index) {
					$(this).css({display: 'none'})
				});
			}
		}
	}
}
var Grid = {
	init: function(target) {
		var $container = target.find('.tj_container'),
			$grid = $container.find('.tj_gallery'),
			$nav = $container.find('.tj_nav'),
			$navLeft = $nav.find('.tj_prev'),
			$navRight = $nav.find('.tj_next');
		
		// flag to control animation progress
		$grid.data('anim', false);
			
		Grid.scale(target);
		// navigation events
		if ($navLeft.length) {
			$navLeft.on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				if ($grid.data('anim')) return false;
				$grid.data('anim', true);
				Grid.paginate($grid, -1);
				return false;
			});
		}
		if ($navRight.length) {
			$navRight.on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				if ($grid.data('anim')) return false;
				$grid.data('anim', true);
				Grid.paginate($grid, 1);
				return false;
			});
		}
	},
	
	scale: function(target) {
		var $container = target.find('.tj_container'),
			$grid = $container.find('.tj_gallery'),
			$nav = $container.find('.tj_nav'),
			$pageNav = $nav.find('.tj_nav_container'),
			$items = $grid.children('li');
			numItems = $items.length,
			itemPadding = 8,
			h = availableHeight - 60
			w = Math.min(320, Math.floor((availableWidth / 4) - (3 * itemPadding))),
			itemWidth = Math.max(160, w),
			
			numVisibleRows = Math.floor(h / itemWidth),
			// check how many items we have per row
			numCols = Math.floor(availableWidth / itemWidth),
			// number of items to show is rowCount * n rows
			numVisibleItems = numCols * numVisibleRows,
			// total number of rows
			numRows = Math.ceil(numItems / numCols);
			// total pages
			numPages = Math.ceil(numRows / numVisibleRows)

	
		// save this values for later
		var config = {};
		config.currentRow = 1;
		config.numVisibleRows = numVisibleRows;
		config.numRows = numRows;
		config.numCols = numCols;
		config.numVisibleItems = numVisibleItems;
		
		$grid.data('config', config);	
		
		$items.each(function(i) {
			var $item = $(this),
				row = Math.ceil((i + 1) / numCols),
				t, f = row % numVisibleRows;
			
			if (f === 1) {
				t = '0px';
			} else if (f === 0) {
				t = (numVisibleRows - 1) * itemWidth + 'px';
			} else {
				t = (f - 1) * itemWidth + 'px';
			}

			$item.css({
				'height': itemWidth,
				'width': itemWidth,
				'position': 'absolute',
				'left': itemWidth * Math.floor(i % numCols),
				'top': t,
				'display': (i > numVisibleItems - 1 ? 'none' : 'block')
			})
			.attr('class',
				function(i, c){
					if(c) {
						return c.replace(/\btj_row_\S+/g, '');
					}
					
			})
			.addClass('tj_row_' + Math.ceil((i + 1) / numCols))
			.find('.tj_content').css({
				'height': itemWidth,
				'width': itemWidth,
				'right': itemWidth
			});
		});
		
		
		var spaceH = h - $grid.height();
		
		$parent.css({
			'paddingTop': Math.floor(spaceH / 2),
			'paddingBottom': Math.floor(spaceH / 2),
			'paddingLeft': Math.floor(freeWidth / 2),
			'paddingRight': Math.floor(freeWidth / 2)
		})
		
		// set up page navigation
		$pageNav.html("");

		for (i = 0; i < numPages; i++) {
			$("<a id='row_" + ((i * numVisibleRows) + 1) + "' class='tj_page_nav' href='#'>&#8226;</a>").appendTo($pageNav).on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				if ($grid.data('anim')) return false;
				$grid.data('anim', true);
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				var page = $(this).attr('id').replace(/[^\d]+/g, '');
				Grid.paginate($grid, $grid.data("config").currentRow > page ? -1 : 1, page);
				return false;
			});
		}
		$("a#row_1").addClass('active');
	},
	
	show: function(section) {
		//console.log("// Grid.show");
		$activeSection = section;
		//Home.scrollToSection(section, Grid.show_after);
		Home.scrollToSection(section);
		//console.log("// Grid.show_after");
		var $category = $activeSection.find(".category:first"),
			$products = $activeSection.find(".products:first");
			
			//console.log("XXXXXXX Grid.show" + $category);
			
		$activeSection.attr('data-state', 'grid');
		
		$products.css('left', availableWidth).addClass('active');
		Grid.init($products);
		
		$body.addClass("noscroll");
	
		$category.animate({'left': -availableWidth}, 900, function() {
			$(this).removeClass('active');
		});
		$products.animate({'left': 0}, 900);
		
		$products.data()
	},
	hide: function(section) {
		//console.log("// Grid.hide " + section.attr("id"));
		var $category = section.find(".category:first"),
			$products = section.find(".products:first");
		section.attr('data-state', 'category');
		$category.addClass('active').animate({'left':0}, 900);
		$products.animate({'left': availableWidth}, 900, function() {
			$body.removeClass("noscroll");
		});
	},
	resize: function(target) {
		Grid.scale(target);
	},
	paginate: function(target, dir, page) {
		var config = target.data('config');
			
		
		if (page != undefined && config.currentRow == page) {

			target.data('anim', false);
			return false;
		} else if ((dir === 1 && config.currentRow + config.numVisibleRows > config.numRows) || (dir === -1 && config.currentRow - config.numVisibleRows <= 0)) {
			target.data('anim', false);
			return false;
		}

		
		if (page != undefined) {
			
		} else {
			var activePageNav = target.parent().parent().find(".tj_page_nav.active");
			if(activePageNav.length > 0) {
				activePageNav.removeClass('active');
				if(dir === 1) {
					activePageNav.next().addClass('active');
				} else {
					activePageNav.prev().addClass('active');
				}
			}
		}	

		var currentRows = '',
			nextRows = '';
		for (var i = 0; i < config.numVisibleRows; ++i) {
			currentRows += '.tj_row_' + (config.currentRow + i) + ',';
			if (page != undefined) {
				if (page > config.currentRow) {
					dir = 1;
				} else {
					dir = -1;
				}
				nextRows += '.tj_row_' + (Number(page) + i) + ',';
			} else if (dir === 1) {
				nextRows += '.tj_row_' + (config.currentRow + config.numVisibleRows + i) + ','
			} else {
				nextRows += '.tj_row_' + (config.currentRow - 1 - i) + ',';
			}
		}

		var seq_t = 50;

		var $currentRowElements;
		(dir === 1) ? $currentRowElements = target.children(currentRows) : $currentRowElements = target.children(currentRows).reverse();

		$currentRowElements.each(function(i) {
			var $el = $(this);
			setTimeout(function() {
				$el.fadeOut(500, 'jswing')
			}, seq_t + i * seq_t);
		});

		var $nextRowElements;
		if (dir === 1) {
			$nextRowElements = target.children(nextRows);
		} else {
			$nextRowElements = target.children(nextRows).reverse();
		}

		var total_elems = $nextRowElements.length,
			cnt = 0;

		$nextRowElements.each(function(i) {
			var $el = $(this);
			setTimeout(function() {
				$el.fadeIn(500, 'jswing', function() {
					++cnt;
					if (cnt === total_elems) {
						target.data('anim', false);
					}
				})
			}, (seq_t * 2) + i * seq_t);
		});


		if (page != undefined) {
			if (dir === 1) {
				config.currentRow = Number(page);
			} else {
				config.currentRow = Number(page);
			}
		} else if (dir === 1) {
			config.currentRow += config.numVisibleRows;
		} else {
			config.currentRow -= config.numVisibleRows;
		}
		

		target.data('config', config);

	}
}
var Category = {
	init: function(target) {

	},
	show: function(section) {
		
		if($activeSection == undefined) {
			Home.scrollToSection(section);
		}
		else {
		//	console.log("// Category.show " + section.attr("id"));
			var activeSectionId = $activeSection.attr('id'),
				sectionId = section.attr('id'),
				activeSectionState = $activeSection.attr('data-state');
		//	console.log("// activeSection state: " + activeSectionState);
			
			$activeSection.attr('data-state', 'category');	
				
			if(activeSectionState == 'category') {
				//console.log("// category: ");
				Home.scrollToSection(section, null);
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
						Home.scrollToSection(section, false);
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
						Home.scrollToSection(section, false);
					});
			}
		}
		$activeSection = section;
	},
	hide: function(section) {

	},
	resize: function(target) {

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
