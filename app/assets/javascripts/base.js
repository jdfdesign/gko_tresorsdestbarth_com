function closeFooter() {
  if (!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)))) {
    $("footer").animate({height: 30}, 840, 'easeOutExpo',function() {
      $(this).removeClass("open")
    });
  }
} 

$(function () {
  
  /* slideshow */
  $(".slideshow").each(function () {
    var that = this;
    var cap = $("li.current img", that).attr("alt");
    $(".caption", that).html(cap);
    var count = $(".slides ul li", that).length;
    var i, ar = [];
    for (i = 1; i <= count; i++) {
      ar.push("." + i);
    }
    $(".slides", that).jCarouselLite({
      btnPrev: $(".prev-slide", that),
      btnNext: $(".next-slide", that),
      btnGo: ar,
      easing: "easeOutExpo",
      afterEnd: function (a, to, btnGo) {
        var cap = $("li.current img", that).attr("alt");
        $(".caption", that).html(cap);
        if (btnGo.length <= to) {
          to = 0;
        }
        $(".circle-nav a", that).removeClass("current");
        $(btnGo[to], that).addClass("current");
      }
    });
  });
  $(".slides").hover(function () {
    $(".arrow").fadeIn(300);
  }, function () {
    $(".arrow").fadeOut(300);
  });
  $(".circle-nav a").click(function (e) {
    e.preventDefault();
  }); 
  
  /* focus + blur treatment on input boxes */
  $.fn.focusAndBlur = function() {
    $.each(this, function(index, target) {
      enable($(target));
    });
    function enable(target) {
      var initVal = target.val();
      target.focus(
      function() {
        if (target.val() === initVal) {
          $(this).val("");
        }
      }).blur(function() {
        if (!$(this).val()) {
          $(this).val(initVal);
        }
      });
    };
  };
  $("input:text, input:password").focusAndBlur();

  /* footer drawer */
  $("footer nav").click(function () {
    if (!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)))) {
      if ($(this).parent().hasClass("open")) {
        closeFooter();
      } else {
        $(this).parent().addClass("open");
        $("footer").animate({
          height: 384
        }, 840, 'easeOutExpo');
      }
    }
  });
  
  $(".section, #primary").click(function () {
    closeFooter();
  });

  function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  };

/* footer login */
  $("#loginButton").click(function () {
	$('#loginFailed').hide();
	$('#loginFormWrapper').append('<div id="loader"></div>');
    $.post("/xmlrpc-proxy.php", $("#loginForm").serialize(), function (data) {
      $(data).find('boolean:first').each(function () {
        if ($(this).text() == "1") {
          $("#loginForm").submit();
        } else {
		  $('#loginFailed').show();
		  $('#loader').remove();
        }
      });
    });
    return false;
  });

  $("#apply").submit(function () {
    //Validation
    var valid = true;
    var email = $('#apply input[name=email_address]').val();
	$('#apply input').removeClass('error');
	
    if ($('#apply input[name=first_name]').val().length == 0 || $('#apply input[name=first_name]').val().toLowerCase() == 'first name') {
      $('#apply input[name=first_name]').addClass('error');
    }
	if ($('#apply input[name=last_name]').val().length == 0 || $('#apply input[name=last_name]').val().toLowerCase() == 'last name') {
      $('#apply input[name=last_name]').addClass('error');
    }
	if ($('#apply input[name=company_name]').val().length == 0 || $('#apply input[name=company_name]').val().toLowerCase() == 'what you do') {
      $('#apply input[name=company_name]').addClass('error');
    }
	if (email.length == 0 || email.toLowerCase() == 'email' || !isValidEmailAddress(email)) {
      $('#apply input[name=email_address]').addClass('error');
    }
	
	valid = !$('#apply input').hasClass('error');
	
    if (valid) {
      var dataString = $("#apply").serialize().replace('Referred+by', '');
      $.ajax({
        type: "POST",
        url: "http://members.grindspaces.com/grind-code/index.php/admin/applicantmanagement/insertApplicantJsonP",
        data: dataString,
        dataType: "jsonp",
        success: function (returnData) {
          if (returnData == null) {
            alert("Failed to send. Please try again.")
          } else if (returnData.success == 0 && returnData.reason == 'EMAILNOTUNIQUE') {
            alert("The email address you have entered is already being used by another Grind member. Please try again.");
            $('#apply input[name=email_address]').addClass('error');
          } else if (returnData.success == 1) {
            $('#applicant-name').html($('#apply input[name=first_name]').val())
            $('#apply-form').fadeOut(1000);
            $('#apply-form-success').fadeIn(1000);
          } else {
            alert("Failed to send. Please try again.");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("Failed to send. Please try again. " + textStatus)
        }
      });
    }
    return false;
  });
});


/* scrollTo */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/* one page nav */
;(function($){$.fn.onePageNav=function(options){var opts=$.extend({},$.fn.onePageNav.defaults,options),onePageNav={};onePageNav.sections={};onePageNav.bindNav=function($el,$this,curClass,changeHash,scrollSpeed){var $par=$el.parent(),newLoc=$el.attr('href'),$doc=$(document);if(!$par.hasClass(curClass)){onePageNav.adjustNav($this,$par,curClass);$doc.unbind('.onePageNav');$.scrollTo(newLoc,scrollSpeed,{easing:'easeOutExpo',onAfter:function(){if(changeHash){window.location.hash=newLoc;}
$doc.bind('scroll.onePageNav',function(){onePageNav.scrollChange($this,curClass);});}});}};onePageNav.adjustNav=function($this,$el,curClass){$this.find('.'+curClass).removeClass(curClass);$el.addClass(curClass);};onePageNav.getPositions=function($this){$this.find('a').each(function(){var linkHref=$(this).attr('href'),divPos=$(linkHref).offset(),topPos=divPos.top;onePageNav.sections[linkHref.substr(1)]=Math.round(topPos);});};onePageNav.getSection=function(windowPos){var returnValue='',windowHeight=Math.round($(window).height()/2);for(var section in onePageNav.sections){if((onePageNav.sections[section]-windowHeight)<windowPos){returnValue=section;}}
return returnValue;};onePageNav.scrollChange=function($this,curClass){onePageNav.getPositions($this);var windowTop=$(window).scrollTop(),position=onePageNav.getSection(windowTop);if(position!==''){onePageNav.adjustNav($this,$this.find('a[href=#'+position+']').parent(),curClass);}};onePageNav.init=function($this,o){$this.find('a').bind('click',function(e){onePageNav.bindNav($(this),$this,o.currentClass,o.changeHash,o.scrollSpeed);e.preventDefault();});onePageNav.getPositions($this);var didScroll=false;$(document).bind('scroll.onePageNav',function(){didScroll=true;});setInterval(function(){if(didScroll){didScroll=false;onePageNav.scrollChange($this,o.currentClass);}},250);};return this.each(function(){var $this=$(this),o=$.meta?$.extend({},opts,$this.data()):opts;onePageNav.init($this,o);});};$.fn.onePageNav.defaults={currentClass:'current',changeHash:false,scrollSpeed:840};})(jQuery)


$(function() {
  function homeImgResize() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var homeImg = $('#home img');
    homeImg.width(windowWidth);
    if(homeImg.width() < 939) {
      homeImg.width(939);
    }
  }
  
  homeImgResize();
  $(window).resize(function () {
    homeImgResize();
  });
  
  $('#primary ul').onePageNav({
    scrollSpeed: 850
  });
  
  $("#join a.btn").click(function (e) {
    e.preventDefault();
    $.scrollTo("#apply-form-wrapper", 850, {easing: 'easeOutExpo'});
    closeFooter();
  });
});
  
jQuery(

function ($) {
  $.Body = $('body');
  $.Window = $(window);
  $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
  $.Mobile = ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)));
  if ($.Mobile) {
    $.Body.addClass('mobile');
  }
  $('[data-controller]').Instantiate();
}); /* Events */
(function ($) {
  $.Events = {
    SECTION_ENTER: 'sectionEnter',
    SCROLL_TO: 'scrollTo',
    SCROLL: 'windowScroll',
    SCROLL_ENTER: 'windowScrollEnter',
    SCROLL_LEAVE: 'windwScrollLeave'
  } // Events  
  $.Views = {} // Views 
})(jQuery); 

/* Auto Instantiate */
(function ($) {
  $.fn.Instantiate = function (settings) {
    var config = {};
    if (settings) $.extend(config, settings);
    this.each(function () {
      var $self = $(this),
          $controller = $self.attr('data-controller');
      if ($self[$controller]) $self[$controller]();
    });
  }
})(jQuery); 

/* Scrollable */
(function ($) {
  $.fn.Scrollable = function (settings) {
    var config = {
      threshold: -100,
      offset_scroll: 6,
      offset_intertia: .2
    };
    if (settings) $.extend(config, settings);
    this.each(function () {
      var $self = $(this),
          $id = $self.attr('id');
      config.threshold = 0
      if ($.Mobile) {
        $self.css({
          backgroundAttachment: 'scroll'
        })
      } else {
        $.Window.bind('scroll', function (e) {
          if ($.inview($self, {
            threshold: config.threshold
          })) {
            if (!$self.hasClass('_active')) {
              $self.addClass('_active');
              $self.triggerHandler($.Events.SCROLL_ENTER);
            }
            _scroll_background();
            $self.triggerHandler($.Events.SCROLL, $.distancefromfold($self, {
              threshold: config.threshold
            }) - config.threshold)
          } else {
            if ($self.hasClass('_active')) {
              $self.removeClass('_active');
              $self.triggerHandler($.Events.SCROLL_LEAVE);
            }
          }
        })
      }

      function _scroll_background() {
        var _x = '50% '
        var _z = '40% '
        var bpos = _x + (-($.distancefromfold($self, {
          threshold: config.threshold
        }) - config.threshold) * config.offset_intertia) + 'px';
        $self.css({
          'backgroundPosition': bpos
        })
      }
    });
    return this;
  }
  $.fn.what = function () {
    this.each(function () {
      var $self = $(this);
      $self.Scrollable()
    });
    return this;
  }
  $.fn.why = function () {
    this.each(function () {
      var $self = $(this);
      $self.Scrollable()
    });
    return this;
  }
  $.fn.how = function () {
    this.each(function () {
      var $self = $(this);
      $self.Scrollable()
    });
    return this;
  }
  $.fn.who = function () {
    this.each(function () {
      var $self = $(this);
      $self.Scrollable()
    });
    return this;
  }
  $.fn.ism = function () {
    this.each(function () {
      var $self = $(this);
      $self.Scrollable()
    });
    return this;
  }
})(jQuery);

/* SiteScroll */
(function ($) {
  $.fn.SiteScroll = function () {
    this.each(function () {
      var $self = $(this);
      $.Body.bind($.Events.SCROLL_TO, function (e, id) {
        var $element = $('#' + id),
            _offset = 50,
            _top = $element.offset().top;
        $.Scroll.stop().animate({
          'scrollTop': _top
        }, 800, 'easeInOutQuart')
      })
    });
    return this;
  }
})(jQuery);

/* Worker */
(function ($) {
  $.distancefromfold = function ($element, settings) {
    if (settings.container === undefined || settings.container === window) {
      var fold = $(window).height() + $(window).scrollTop();
    } else {
      var fold = $(settings.container).offset().top + $(settings.container).height();
    }
    return (fold + settings.threshold) - $element.offset().top;
  };
  $.belowthefold = function ($element, settings) {
    if (settings.container === undefined || settings.container === window) {
      var fold = $(window).height() + $(window).scrollTop();
    } else {
      var fold = $(settings.container).offset().top + $(settings.container).height();
    }
    return fold <= $element.offset().top - settings.threshold;
  };
  $.abovethetop = function ($element, settings) {
    if (settings.container === undefined || settings.container === window) {
      var fold = $(window).scrollTop();
    } else {
      var fold = $(settings.container).offset().top;
    }
    return fold >= $element.offset().top + settings.threshold + $element.height();
  };
  $.inview = function ($element, settings) {
    return ($.abovethetop($element, settings) != true && $.belowthefold($element, settings) != true)
  };
})(jQuery);