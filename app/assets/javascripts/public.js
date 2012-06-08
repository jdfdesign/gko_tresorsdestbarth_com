//= require gko_store_public_all
//= require jquery.flyer
//= require jquery.inview
//= require jquery.scrollParallax
//= require jquery.sidescroll.js
//= require jquery.scrollTo-1.4.2.js
$(document).ready(function() {
    function makePage(body) {
        return $("<div id='js-page-container' class='article fade'><div class='main-column-inner'><div class='page-header' style='min-height: 30px;'><a class='close' data-dismiss='flyer'>×</a></div><div class='page-body'>" + body + "</div></div></div>")
    }


    var linkLocation;
	function f_filterResults(n_win, n_docel, n_body) {
		var n_result = n_win ? n_win : 0;
		if (n_docel && (!n_result || (n_result > n_docel)))
			n_result = n_docel;
		return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
	}
	function f_scrollTop() {
		return f_filterResults (
			window.pageYOffset ? window.pageYOffset : 0,
			document.documentElement ? document.documentElement.scrollTop : 0,
			document.body ? document.body.scrollTop : 0
		);
	}
	f_refresh_ui = function() {
		var viewportH = f_viewport_wh().h
		,viewportW = f_viewport_wh().w;
		coverHeight = viewportH - $('.navbar').height();
		
		$('.parallax').css({'height': viewportH, 'width': viewportW});
		$('.parallax-item').css({'height': viewportH, 'width': viewportW});
		$('#cover').css('height', coverHeight);
    }
	f_init_ajax = function() {
		// Bind show product action
        $(".thumbnail a, a.next, a.previous").attr('data-remote', 'true')
		.on('ajax:beforeSend', function(evt) {
			f_scrollTop();
		})
        .on('ajax:complete',
        function(evt, xhr, status) {
	 		$("#js-page-container").remove();
            var win = makePage(eval(xhr.responseText).html());
            modal = win.prependTo($(".collection-container:first"));
			modal.flyer({
	            backdrop: 'static',
	            show: true
	        }).bind('hidden',
	        function(e) {
	            $(this).remove();
	        }).find('a.next, a.previous').attr('data-remote', 'true');
        });

		// Bind index product action
        $("a.view-all")
		.on('click', function(e) {
			e.stopPropagation();
            e.preventDefault();
			$body.css('overflow', 'hidden');
			$html.css('overflow', 'hidden');
			
			f_refresh_ui();
			$parallaxInner = $(this).closest(".parallax-inner");
			$parallaxItem = $(this).closest(".parallax-item");
			$next = $parallaxItem.next();
			$next.css({'top': 0, 'left' : windowSize.width}).addClass('active');
			$('html, body').animate({scrollTop: $parallaxInner.offset().top}, 200, function() {
				$parallaxItem.animate({'left': -windowSize.width}, 900, function() {
					$(this).removeClass('active');
				});
				$next.animate({'left': 0}, 900);
			});
        });
	}
	f_init_home_page = function() {
		$('.parallax').scrollParallax({'speed': -0.2});
		$sidescroll.init();
	}
	f_init = function() {
		windowSize.width = $window.width();
		windowSize.height = $window.height();
		if(bodyId == 'home') {
			f_init_home_page();
		}
		f_refresh_ui();
        $(window).on("throttledresize",
        function(e) {
			windowSize.width = $window.width();
			windowSize.height = $window.height();
            f_refresh_ui();
        });
		f_init_ajax();
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
	
	var  $body = $("body")
		,$html = $("html")
		,$window = $(window)
		,$container = $("#content-container")
		,$wrapper = $("#wrapper-wide-body")
		,$parallaxInner
		,$parallaxItem
		,bodyId = $body.attr('id')
		,windowSize = {}// we will store the window sizes here
		,coverHeight;
		
	f_init(); 
});