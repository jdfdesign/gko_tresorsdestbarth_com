

	var $sidescroll	= (function() {
			
			// the row elements
		var $rows = $('.parallax'),
			// we will cache the inviewport rows and the outside viewport rows
			$rowsViewport, $rowsOutViewport,
			// the window element
			$win = $(window),
			// we will store the window sizes here
			winSize = {},
			// used in the scroll setTimeout function
			anim = false,

			// initialize function
			init = function() {
				// define the inviewport selector
				defineViewport();
				refresh();
				placeRows(); // set positions for each row
				// initialize events
				initEvents();
				
			},
			// refresh function
			refresh = function() {
				// get the window sizes again
				getWinSize();
				// redefine which rows are initially visible (:inviewport)
				setViewportRows();
				// show inviewport rows and respective pointers
				$rowsViewport.each( function() {
				
					$(this).find('div.ss-left')
						   .css({ left   : '0%' })
						   .end()
						   .find('div.ss-right')
						   .css({ right  : '0%' });
				
				});
				
			},
			// defines a selector that gathers the row elems that are initially visible.
			// the element is visible if its top is less than the window's height.
			// these elements will not be affected when scrolling the page.
			defineViewport	= function() {
				$.extend( $.expr[':'], {
					inviewport	: function ( el ) {
						if ( $(el).offset().top < winSize.height ) {
							return true;
						}
						return false;
					}
				});
			},
			// checks which rows are initially visible 
			setViewportRows	= function() {
				$rowsViewport 		= $rows.filter(':inviewport');
				$rowsOutViewport	= $rows.not( $rowsViewport );
			},
			// get window sizes
			getWinSize		= function() {
				winSize.width	= $win.width();
				winSize.height	= $win.height();
			},
			// initialize some events
			initEvents		= function() {
				$(window).on({
					// on window resize we need to redefine which rows are initially visible (this ones we will not animate).
					'resize.Scrolling' : function( event ) {
						refresh();
					},
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
				$rowsOutViewport.each( function(i) {
					
					var $row	= $(this),
						// the left side element
						$rowL	= $row.find('div.ss-left'),
						// the right side element
						$rowR	= $row.find('div.ss-right'),
						// top value
						rowT	= $row.offset().top;
					
					// hide the row if it is under the viewport
					if( rowT > winSize.height + winscroll ) {
						$rowL.css({ left 		: '-50%' });
						$rowR.css({ right 		: '-50%' });
					}
					// if not, the row should become visible (0% of left/right) as it gets closer to the center of the screen.
					else {
						// row's height
						var rowH	= $row.height(),
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

