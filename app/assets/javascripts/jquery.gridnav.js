(function($) {
	jQuery.fn.reverse = Array.prototype.reverse;
	
	var 
		// auxiliar functions
		aux		= {
			setup				: function( $wrapper, $items, opts ) {
				
				// set the wrappers position to relative
				$wrapper.css('position', 'relative');
			
				var $parent = $wrapper.parent(),
					parentHeight = $parent.height(),
					parentWidth = $parent.width(),
					ulWidth = $wrapper.width(),
					liWidth = $items.width(),
					w = Math.floor( (parentWidth / 4) - (3 * opts.itemPadding)),
					itemWidth = Math.max(opts.minItemWidth, Math.min(opts.itemWidth, w));

				
				$items.each(function(i) {
					var $item 	= $(this);

					$item.css({
						'height' :itemWidth,
						'width': itemWidth
					});
					
					$item.find('.tj_content:first').css({
						'height' :itemWidth,
						'width': itemWidth
					});
				});
				

				// save the items position
				aux.saveInitialPosition( $items );
				
				// set the items to absolute and assign top & left
				$items.each(function(i) {
					var $item 	= $(this);

					$item.css({
						position	: 'absolute',
						left		: $item.data('left'),
						top			: $item.data('top')
					});
				});
				opts.rows = Math.floor( parentHeight / itemWidth );
				// check how many items we have per row
				var rowCount 	= Math.floor( ulWidth / itemWidth ),
				// number of items to show is rowCount * n rows
				shown		= rowCount * opts.rows,
				// total number of rows
				totalRows	= Math.ceil( $items.length / rowCount );

				// save this values for later
				var config			= {};
				config.currentRow	= 1;
				config.totalRows	= totalRows;
				config.rowCount 	= rowCount;
				config.shownItems	= shown;
				
				
				// show n rowns
				$wrapper.children(':gt(' + (shown - 1) + ')').hide();
				
				// assign row classes to the items
				$items.each(function(i) {
					var $item 	= $(this),
						row		= Math.ceil( (i + 1) / rowCount );
					
					$item.addClass('tj_row_' + row);		
				});

				var freeWidth = parentWidth - (itemWidth * rowCount),
					freeHeight = parentHeight - (itemWidth * opts.rows);

				$parent.css({
					'paddingTop': Math.floor(freeHeight / 2),
					'paddingBottom': Math.floor(freeHeight / 2),
					'paddingLeft': Math.floor(freeWidth / 2),
					'paddingRight': Math.floor(freeWidth / 2)
				})
				
				var nav_container = $parent.parent().find('.tj_nav_container:first');
				for (i=0; i<(totalRows / opts.rows); i++) {
				  $("<a id='row_" + ((i*opts.rows)+1) + "' class='tj_page_nav' href='#'>&#8226;</a>").appendTo(nav_container).on('click', function( e ) {
						e.stopPropagation();
			            e.preventDefault();
						$(this).parent().find('.active').removeClass('active');
						$(this).addClass('active');
						if( $wrapper.data( 'anim' ) ) return false;
						$wrapper.data( 'anim', true );
						num = $(this).attr('id').replace(/[^\d]+/g, '');
						nav[opts.type.mode].pagination( $wrapper, 0, opts, num );
						return false;
					});;
				}
				
				
				$wrapper.data('config', config);
				nav.setup( $wrapper, $items, opts );
				
			},
			saveInitialPosition	: function( $items ) {
				$items.each(function(i) {
					var $item 	= $(this);
					
					$item.data({
						left		: $item.position().left + 'px',
						top			: ($item.position().top + 5) + 'px'
					});									
				});
			}
		},
		// navigation types
		nav		= {
			setup			: function( $wrapper, $items, opts ) {
				nav[opts.type.mode].setup( $wrapper, $items, opts );
			},
			def				: {
				setup		: function( $wrapper, $items, opts ) {
					var config = $wrapper.data('config');
					if(config.shownItems > $items.length) {
						$(opts.navL).hide();
						$(opts.navR).hide();
					}
					$items.each(function(i) {
						var $item 	= $(this),
							row		= Math.ceil( (i + 1) / config.rowCount ),
							t,
							f = row % opts.rows;
					
						if( f === 1 ) {
							t = '0px';		
						} else if( f === 0 ) {
							t = (opts.rows - 1) * $items.height()  + 'px'; 
						} else {
							t = (f - 1) * $items.height() + 'px';
						}
						
						$item.css({ top	: t });
					});	
					
					
				},
				pagination	: function( $wrapper, dir, opts ) {
					var config = $wrapper.data('config');

					if( ( dir === 1 && config.currentRow + opts.rows > config.totalRows ) || 
						( dir === -1 && config.currentRow - opts.rows <= 0 )
					) {
						$wrapper.data( 'anim', false );
						return false;
					}
					
					var currentRows	= '', nextRows = '';
					
					for( var i = 0; i < opts.rows; ++i ) {
						currentRows += '.tj_row_' + (config.currentRow + i) + ',';
						
						(dir === 1)
							? nextRows	+= '.tj_row_' + (config.currentRow + opts.rows + i) + ','
							: nextRows	+= '.tj_row_' + (config.currentRow - 1 - i) + ',';
					}
					
					$wrapper.children(currentRows).hide();
					$wrapper.children(nextRows).show();
					
					(dir === 1) ? config.currentRow += opts.rows : config.currentRow -= opts.rows;
					
					$wrapper.data( 'anim', false );

					$wrapper.data('config', config);
				}
			},
			fade			: {
				setup		: function( $wrapper, $items, opts ) {
					// same like def mode
					nav['def'].setup( $wrapper, $items, opts );
				},
				pagination	: function( $wrapper, dir, opts ) {
					var config = $wrapper.data('config');

					if( ( dir === 1 && config.currentRow + opts.rows > config.totalRows ) ||
						( dir === -1 && config.currentRow - opts.rows <= 0 )
					) {
						$wrapper.data( 'anim', false );
						return false;
					}
					
					var currentRows	= '', nextRows = '';
					
					for( var i = 0; i < opts.rows; ++i ) {
						currentRows += '.tj_row_' + (config.currentRow + i) + ',';
						
						(dir === 1)
							? nextRows	+= '.tj_row_' + (config.currentRow + opts.rows + i) + ','
							: nextRows	+= '.tj_row_' + (config.currentRow - 1 - i) + ',';
					}
					
					$wrapper.children(currentRows).fadeOut( opts.type.speed, opts.type.easing );
					
					var $nextRowElements= $wrapper.children(nextRows),

						totalNextRows	= $nextRowElements.length,
						cnt				= 0;
						
					$nextRowElements.fadeIn( opts.type.speed, opts.type.easing, function() {
						++cnt;
						if( cnt === totalNextRows ) {
							$wrapper.data( 'anim', false );
						}	
					});
					
					(dir === 1) ? config.currentRow += opts.rows : config.currentRow -= opts.rows;

					$wrapper.data('config', config);
				}
			},
			seqfade			: {
				setup		: function( $wrapper, $items, opts ) {
					// same like def mode
					nav['def'].setup( $wrapper, $items, opts );
				},
				pagination	: function( $wrapper, dir, opts, page ) {
					var config = $wrapper.data('config');
					
					if(page != undefined && config.currentRow == page) {
						console.log('stop ' + page)
						$wrapper.data( 'anim', false );
						return false;
					}
					else if( ( dir === 1 && config.currentRow + opts.rows > config.totalRows ) || 
						( dir === -1 && config.currentRow - opts.rows <= 0 )
					) {
						$wrapper.data( 'anim', false );
						return false;
					}
					
					var currentRows	= '', nextRows = '';
					for( var i = 0; i < opts.rows; ++i ) {
						currentRows += '.tj_row_' + (config.currentRow + i) + ',';
						if(page != undefined) {
							if(page > config.currentRow) {
								dir = 1;
							}
							else {
								dir = -1;
							}
							nextRows	+= '.tj_row_' + (Number(page) + i) + ',';
						}
						else if(dir === 1) {
							nextRows	+= '.tj_row_' + (config.currentRow + opts.rows + i) + ','
						}
						else {
							nextRows	+= '.tj_row_' + (config.currentRow - 1 - i) + ',';
						}
					}
					
					var seq_t	= opts.type.factor;
					
					var $currentRowElements;
					( dir === 1 )
						? $currentRowElements = $wrapper.children(currentRows)
						: $currentRowElements = $wrapper.children(currentRows).reverse();
						
					$currentRowElements.each(function(i) {
						var $el = $(this);
						setTimeout(function() {
							$el.fadeOut( opts.type.speed, opts.type.easing )
						}, seq_t + i * seq_t);
					});
					
					var $nextRowElements;
					( dir === 1 )
						? $nextRowElements = $wrapper.children(nextRows)
						: $nextRowElements = $wrapper.children(nextRows).reverse();
					
					var total_elems	= $nextRowElements.length,
						cnt			= 0;
					
					$nextRowElements.each(function(i) {
						var $el = $(this);
						setTimeout(function() {
							$el.fadeIn( opts.type.speed, opts.type.easing, function() {
								++cnt;
								if( cnt === total_elems ) { 
									$wrapper.data( 'anim', false );
								}	
							})
						}, (seq_t * 2) + i * seq_t);
					});
					

					if(page != undefined) {
						if(dir === 1) {
							config.currentRow = Number(page);
						}
						else {
							config.currentRow = Number(page);
						}
					}
					else if(dir === 1) {
						config.currentRow += opts.rows;
					}
					else {
						config.currentRow -= opts.rows;
					}
					
					$wrapper.data('config', config);
				}
			}
		},
		methods = {
			init 	: function( options ) {
				
				if( this.length ) {
					
					var settings = {
						minItemWidth: 186,
						minItemHeight: 186,
						itemPadding: 8,
						itemWidth: 286,
						itemHeight: 286,
						rows	: 2,
						nav		: '.tj_nav:first',
						navL	: '.tj_prev:first',
						navR	: '.tj_next:first',
						type	: {
							mode		: 'def', 		// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
							speed		: 500,			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
							easing		: 'jswing',		// for fade, seqfade, updown, sequpdown, showhide, disperse, rows	
							factor		: 50,			// for seqfade, sequpdown, rows
							reverse		: false			// for sequpdown
						}
					};
					
					return this.each(function() {
						
						// if options exist, lets merge them with our default settings
						if ( options ) {
							$.extend( settings, options );
						}
						
						var $el 			= $(this).css( 'visibility', 'hidden' ),
							// the ul
							$wrapper		= $el.find('ul.tj_gallery'),
							// the items
							$thumbs			= $wrapper.children('li'),
							total			= $thumbs.length,
							// the navigation elements
							$p_nav			= $el.find(settings.navL),
							$n_nav			= $el.find(settings.navR);
						
						// save current row for later (first visible row)
						//config.currentRow	= 1;
						
						// flag to control animation progress
						$wrapper.data( 'anim', false );
						
						// preload thumbs
						var loaded = 0;
						$thumbs.find('img').each( function(i) {
							var $img 	= $(this);
							$('<img/>').load( function() {
								++loaded;
								if( loaded === total ) {
									// setup
									aux.setup( $wrapper, $thumbs, settings );

									$el.css( 'visibility', 'visible' );
									
									// navigation events
									if( $p_nav.length ) {
										$p_nav.on('click', function( e ) {
											e.stopPropagation();
								            e.preventDefault();
											if( $wrapper.data( 'anim' ) ) return false;
											$wrapper.data( 'anim', true );
											nav[settings.type.mode].pagination( $wrapper, -1, settings );
											return false;
										});
									}
									if( $n_nav.length ) {
										$n_nav.on('click', function( e ) {
											e.stopPropagation();
								            e.preventDefault();
											if( $wrapper.data( 'anim' ) ) return false;
											$wrapper.data( 'anim', true );
											nav[settings.type.mode].pagination( $wrapper, 1, settings );
											return false;
										});
									}
									
								}
							}).attr( 'src', $img.attr('src') );
						});
						
					});
				}
			}
		};
	
	$.fn.gridnav = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.gridnav' );
		}
	};
})(jQuery);		
