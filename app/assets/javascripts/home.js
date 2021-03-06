//= jquery.easing.1.3
//= require jquery.inview
//= require jquery.sidescroll.js
//= require jquery.mousewheel.3.0.6
//= require jquery.debouncedresize.js
//= require gko/gko.galleria
//= require jquery.jscrollpane
//= require jquery-anystretch.js
jQuery.fn.reverse = Array.prototype.reverse;

var $container, $cover, $logo, $locales, $navbar, $activeSection, imagesCount = 0,
    gridColCount = 3,
    gridRowCount = 2,
    gridItemHeight = 300, //including margin and padding
    headerHeight, footerHeight, deltaHeight, availableHeight, availableWidth, isAppleDevice, $notice, $facebook, $viewCartMenuLink, History = window.History; // Note: We are using a capital H instead of a lower h
var Home = {

  init: function() {
    $container = $("#content");
    $cover = $("#cover");
    $locales = $("#locales");
    $logo = $("#logo");
    $navbar = $(".navbar:first");
    $facebook = $("a#facebook");
    headerHeight = $(".navbar:first").height();
    footerHeight = $("#footer-container").height();
    deltaHeight = headerHeight + footerHeight;
    $viewCartMenuLink = $('a#view-cart-menu-link');
    var agent = navigator.userAgent.toLowerCase()
    isAppleDevice = $body.hasClass('mobile-device') || $body.hasClass('tablet-device');

    if (isAppleDevice) {
      $('section.background-image').css('background-attachment', 'absolute');
    }

    // Preload background image before starting animations
    $('section.background-image').each(function(i, el) {
      imagesCount++;
      var bg = $(el).data('bg');

      //src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
      $('<img>').attr('src', bg).on('load', function() {
        imagesCount--;
        //	console.log(">> " + isAppleDevice)
        if (isAppleDevice) {
          $(el).backstretch($(this).attr('src'));
        } else {
          $(el).css("background-image", "url(" + bg + ")")
        }
        Home.onImageLoaded();
      });
    });
  },
  onImageLoaded: function() {
    if (imagesCount == 0) {
      Home.resize();
      Home.attachEvents();
      $sidescroll.init();

      // Temporarily make the container tiny so it doesn't influence the
      // calculation of the size of the document
      //	$container.css({'width': 1,'height': 1});
      // Now make it the size of the window...
      $container.css({
        'width': "100%",
        'height': availableHeight
      });


      var $headline = $cover.find('.headline');
      $headline.css('opacity', 0);
      $logo.css('opacity', 0);
      $facebook.css('top', -50);
      $navbar.css('top', -50);
      $overlay.fadeOut(3000, function() {
        $overlay.remove();
        $logo.animate({
          'opacity': 1
        }, 1200, function() {
          $headline.css({
            'opacity': 1,
            'textShadow': '#ffffff 10 10 600'
          }).animate({
            textShadow: "0 0 50 #ffffff"
          }, 1000);
          $locales.show();
        });
        $navbar.animate({
          'top': 0
        }, 200, function() {
          $("#scrollme").show();
          Home.animateScrollme();
        });
      });
      
      $('.tj_gallery_inner').each(function(i, el) {
        var image = $(el).data('image');
        $(el).prepend("<img src='" + image + "'/>");
      });
    }
  },
  animateScrollme: function() {
    for (var i = 1; i <= 10; i++) {
      $("#scrollme").slideUp(2200).delay(300).slideDown(1600);
    }
  },
  attachEvents: function() {
    $(window).on("debouncedresize", function(e) {
      Home.resize();
    });

/*$(".category")
		.on('click', function(e) {
			e.stopPropagation();
            e.preventDefault();
			Grid.show($(this).parents("section:first"));
        }); */

    $(".category-title a").on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      Grid.show($(this).parents("section:first"), $($(this).attr("href")));
    });

    $('a#treasures').on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      Category.show($("section#treasures"));
    })

    $('a#pearls').on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      Category.show($("section#pearls"));
    })

    $('.products').on('click', 'a.back', function(e) {
      e.stopPropagation();
      e.preventDefault();
      Grid.hide($(this).parents("section:first"));
    })
    $('.product').on('click', 'a.back', function(e) {
      e.stopPropagation();
      e.preventDefault();
      Product.hide($(this).parents("section:first"), $($(this).attr("href")));
    }).on('ajax:beforeSend', 'form.cart-form', function(event, xhr, settings) {

    }).on('ajax:complete', function(evt, xhr, status) {
      Home.showCartUpdateNotice();
    });

    // Bind sitem grid
    $(".tj_gallery_inner").hover(function(e) {
      $(".tj_content", this).slideToggle();
    }, function(e) {
      var t = $(".tj_content");
      $(".tj_content", this).slideToggle();
    }).on('ajax:beforeSend', function(event, xhr, settings) {
      //Util.attachLoading($(this));
    }).on('ajax:complete', function(evt, xhr, status) {
      Product.show($(this).parents("section:first"), $(this).parents(".products:first"), eval(xhr.responseText).html());
    });


  },
  resize: function() {

    Util.availableSpace(); // update space infos before all
    $('.fullscreen').css({
      'height': availableHeight,
      'width': availableWidth
    });
    $.each($('.parallax .headline'), function(index, item) {
      var that = $(this),
          top = (availableHeight - that.height()) / 2;

      top = (top < 0) ? 0 : top;
      that.css('margin-top', top);
    });
    // center vercally the logo
    $logo.css('margin-top', (availableHeight - $logo.height()) / 2)
    $locales.css('top', (availableHeight - $locales.height()) / 2)
    $locales.css('left', (availableWidth + $logo.width()) / 2)
    $facebook.css({
      'top': headerHeight
    });

    $('.products').each(function(i, el) {
      Grid.resize($(el));
    });

    $('article.product').each(function(i, el) {
      Product.resize($(el));
    });

    if ($activeSection) {
      Home.scrollToSection($activeSection);
    }
  },
  scrollToSection: function(section) {
    $('html, body').animate({
      scrollTop: section.position().top
    }, 500);
  },
  showCartUpdateNotice: function() {

    var o = $viewCartMenuLink.position();
    if ($notice === undefined) {

      $notice = $("<div class='notice'>Your selection has been updated !</div>").appendTo($body);
      $notice.css({
        'display': 'none',
        'position': 'fixed',
        'z-index': 10000,
        'left': o.left,
        'top': o.top + 50,
        'background-color': 'green',
        'color': 'white',
        'padding': 8
      })
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

  show: function(section, grid, response) {
    var $grid = grid,
        $product = section.find('.product:first'),
        $content = $product.find(".content:first");

    section.data('state', 'product');

    $product.find('a.back:first').attr("href", "#" + $grid.attr("id"));

    $content.html(response);
    var $article = $content.find("article:first"),
        $info = $article.find('.product-info:first'),
        $carousel = $article.find('.carousel:first');

    Product.size($article);

    $('form.cart-form').attr('data-remote', 'true');

    $grid.animate({
      'left': -availableWidth
    }, 900, function() {
      $(this).removeClass('active')
    });
    $product.css('left', availableWidth).addClass('active').animate({
      'left': 0
    }, 900, function() {
      Product.initCarousel($carousel);
      $info.jScrollPane();
    });
  },
  hide: function(section, grid) {

    var $grid = grid,
        $product = section.find('.product:first');

    section.data('state', 'grid');

    $grid.addClass('active').stop().animate({
      'left': 0
    }, 900);
    $product.stop().animate({
      'left': availableWidth
    }, 900, function() {
      $(this).removeClass('active');
    });

  },
  size: function(article) {
    var $carousel = article.find('.carousel:first'),
        $info = article.find('.product-info:first'),
        minInfoWidth = 300,
        infoMargin = 30,
        maxWidth = article.outerWidth(),
        maxCarouselHeight = availableHeight - 120,
        maxCarouselWidth = maxWidth - minInfoWidth - infoMargin,
        maxCarousel = Math.min(maxCarouselWidth, maxCarouselHeight);
    maxInfoWidth = maxWidth - maxCarousel - infoMargin;

    $carousel.css({
      'max-height': maxCarousel,
      'max-width': maxCarousel
    });
    $info.css({
      'height': maxCarouselHeight,
      'width': maxInfoWidth
    });
  },
  resize: function(article) {
    var $info = article.find('.product-info:first');
    Product.size(article);
    $info.data('jsp').reinitialise();
  },
  initCarousel: function(carousel) {
    if (typeof carousel != 'undefined') {
      if (carousel.find('.item').length > 1) {
        carousel.carousel('pause');
      } else {
        carousel.find('.carousel-control').each(function(index) {
          $(this).css({
            display: 'none'
          })
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


    target.data('initialized', true);
  },

  scale: function(target) {

    var $container = target.find('.tj_container'),
        $grid = $container.find('.tj_gallery'),
        $nav = $container.find('.tj_nav'),
        $pageNav = $nav.find('.tj_nav_container'),
        $items = $grid.children('li');
    numItems = $items.length, itemPadding = 8, maxItemWidth = 286, minItemWidth = 180, h = availableHeight - 60, w = availableWidth - 80, itemWidth = Math.min(maxItemWidth, Math.floor((w / 4) - (3 * itemPadding))), itemWidth = Math.max(minItemWidth, itemWidth), numVisibleRows = Math.floor(h / itemWidth);

    // we want at least 2 rows if possible
    if (numVisibleRows === 1) {
      itemWidth = Math.max(Math.min(h / 2, maxItemWidth), minItemWidth);
      numVisibleRows = Math.floor(h / itemWidth);
    }

    // check how many items we have per row
    numCols = Math.floor(availableWidth / itemWidth),
    // number of items to show is rowCount * n rows
    numVisibleItems = numCols * numVisibleRows,
    // total number of rows
    numRows = Math.ceil(numItems / numCols),
    // total pages
    numPages = Math.ceil(numRows / numVisibleRows);

    $container.hide();

    // save this values for later
    var config = {};
    config.currentRow = 1;
    config.numVisibleRows = numVisibleRows;
    config.numRows = numRows;
    config.numCols = numCols;
    config.numVisibleItems = numVisibleItems;

    $grid.data('config', config);

    var descriptionVisibility = (itemWidth > 200) ? 'block' : 'none';

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
      }).attr('class', function(i, c) {
        if (c) {
          return c.replace(/\btj_row_\S+/g, '');
        }

      }).addClass('tj_row_' + Math.ceil((i + 1) / numCols)).find('.tj_content').css('display', 'none').find('.description').css('display', descriptionVisibility)
    });


    var spaceH = h - (itemWidth * numVisibleRows),
        spaceW = w - (itemWidth * numCols);

    $grid.parent().css({
      'paddingTop': Math.floor(spaceH / 2),
      'paddingBottom': Math.floor(spaceH / 2),
      'paddingLeft': Math.floor(spaceW / 2),
      'paddingRight': Math.floor(spaceW / 2)
    })

    // set up page navigation
    $pageNav.html("");
    if (numPages > 1) {
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
      $nav.show();
    } else {
      $nav.hide();
    }

    $container.show();
  },

  show: function(section, products) {
    //console.log("// Grid.show");
    $activeSection = section;

    Home.scrollToSection(section);

    var $category = $activeSection.find(".category:first"),
        $products = products;

    $activeSection.data('state', 'grid');

    $products.css('left', availableWidth).addClass('active');

    if (!$products.data('initialized')) {
      Grid.init($products);
    }

    $body.addClass("noscroll");

    $category.stop().animate({
      'left': -availableWidth
    }, 900, function() {
      $(this).removeClass('active');
    });
    $products.stop().animate({
      'left': 0
    }, 900);
  },
  hide: function(section) {
    //console.log("// Grid.hide " + section.attr("id"));
    var $category = section.find(".category:first"),
        $products = section.find(".products.active:first");
    section.attr('data-state', 'category');
    $category.addClass('active').stop().animate({
      'left': 0
    }, 900);
    $products.stop().animate({
      'left': availableWidth
    }, 900, function() {
      $body.removeClass("noscroll");
      $(this).removeClass('active');
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
      if (activePageNav.length > 0) {
        activePageNav.removeClass('active');
        if (dir === 1) {
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
        $el.fadeOut(500, 'swing')
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
        $el.fadeIn(500, 'swing', function() {
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
    if ($activeSection == undefined) {
      Home.scrollToSection(section);
    } else {
      
      var activeSectionId = $activeSection.attr('id'),
          sectionId = section.attr('id'),
          activeSectionState = $activeSection.data('state'); 
      if (activeSectionState == 'category') {
        Home.scrollToSection(section, null);
      } else if (activeSectionState == "product") {
        var $category = $activeSection.find(".category:first"),
            $product = $activeSection.find('.product.active:first'),
            $grid = $activeSection.find($product.find('a.back:first').attr("href"));

        $product.stop().animate({
          'left': availableWidth
        }, 900, function() {
          $(this).removeClass('active');
        });
        $grid.addClass('active').stop().animate({
          'left': availableWidth
        }, 1800, function() {
          $(this).removeClass('active');
          
        });
        $category.addClass('active').stop().animate({
          'left': 0
        }, 2700, function() {
          $body.removeClass("noscroll");
          Home.scrollToSection(section, false);
        });
      } else if (activeSectionState == "grid") {
        var $products = $activeSection.find('.products.active:first'),
            $category = $activeSection.find(".category:first");
        $products.stop().animate({
          'left': availableWidth
        }, 900, function() {
          $(this).removeClass('active');
        });
        $category.addClass('active').stop().animate({
          'left': 0
        }, 1800, function() {
          $body.removeClass("noscroll");
          Home.scrollToSection(section, false);
        });
      }
    }
    section.data('state', 'category');
    $activeSection = section;
  },
  hide: function(section) {

  },
  resize: function(target) {

  }
}
