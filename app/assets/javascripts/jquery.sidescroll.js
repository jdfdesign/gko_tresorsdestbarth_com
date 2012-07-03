

	var $sidescroll	= (function() {
			
			// the row elements
		var $rows = $('.parallax'),
			// the window element
			$win = $(window),
			// we will store the window sizes here
			winSize = {},
			// used in the scroll setTimeout function
			anim = false,

			// initialize function
			init = function() {
				
				refresh();
				placeRows();
				initEvents();
			},
			// refresh function
			refresh = function() {
				// get the window sizes again
				getWinSize();
				// show inviewport rows and respective pointers
				$('.inview').each( function() {
					$(this).find('div.ss-left')
						   .css({ left   : '0%' })
						   .end()
						   .find('div.ss-right')
						   .css({ right  : '0%' });
				});
			},
			// get window sizes
			getWinSize		= function() {
				winSize.width	= $win.width();
				winSize.height	= $win.height();
			},
			// initialize some events
			initEvents = function() {
				$(window).on({
					'throttledresize' : function( event ) {
						refresh();
					}
				});
				$('#wrapper-wide-body').on({
					// when scrolling the page change the position of each row	
					'scroll.Scrolling' : function( event ) {

						// set a timeout to avoid that the 
						// placeRows function gets called on every scroll trigger
						if( anim ) return false;
						anim = true;
						setTimeout( function() {
							placeRows();
							anim = false;
						}, 10 );
					}
				});
			},
			// sets the position of the rows (left and right row elements).
			// Both of these elements will start with -50% for the left/right (not visible)
			// and this value should be 0% (final position) when the element is on the
			// center of the window.
			placeRows		= function() {
			
					// how much we scrolled so far
				var winscroll	= $win.scrollTop(),
					// the y value for the center of the screen
					winCenter	= winSize.height / 2 + winscroll;
				
				// for every row that is not inviewport
				$('.inview').each( function(i) {
					
					var $row	= $(this),
						// the left side element
						$rowL	= $row.find('div.ss-left'),
						// the right side element
						$rowR	= $row.find('div.ss-right'),
						// top value
						rowT	= $row.offset().top,
						$headline = $row.find('.headline:first')
					
					// hide the row if it is under the viewport
					if( rowT > winSize.height + winscroll ) {
						$rowL.css({ left 		: '-50%' });
						$rowR.css({ right 		: '-50%' });
					}
					// if not, the row should become visible (0% of left/right) as it gets closer to the center of the screen.
					else {
						// row's height
						var rowH	= $row.height() - 300,
						// the value on each scrolling step will be proporcional to the distance from the center of the screen to its height
						factor 	= ( ( ( rowT + rowH / 2 ) - winCenter ) / ( winSize.height / 2 + rowH / 2 ) ),
						// value for the left / right of each side of the row.
						// 0% is the limit
						val		= Math.max( factor * 50, 0 );
						// set calculated values
						$rowL.css({ left 	: - val + '%' });
						$rowR.css({ right 	: - val + '%' });
					}	
				});	
			};
		return { init : init };
	})();

