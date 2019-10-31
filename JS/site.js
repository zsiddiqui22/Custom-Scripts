var App = function() {

    /*===========================
            DATE PICKER
    =============================*/
    var _datepicker = function() {
      $('[data-toggle="datepicker"]').datepicker();
    };

    /*==========================
            STICKY HEADER
    ============================*/
    var _stickyHeader = function() {

      $(window).scroll(function() {
        var header = '.sticky-menu';
        if ( $(this).scrollTop() >= 200 && !$(header).hasClass('sticky') && ($('.wrapper').height() > 1000)) {
          $(header).addClass('sticky');
          $(header).slideDown();
        } else if ( $(this).scrollTop() <= 200 ) {
          $(header).removeClass('sticky');
        }
      });

    };

    /*==========================
        Toggle Search Area
    ============================*/
    var _toggleSearchArea = function() {
      $('.search-area').addClass('active');

      $('.toggle-searchbar-btn').click(function(e) {
        e.preventDefault();
        _toggle('.search-area',700);
      });

      $('.search_close').click(function(e) {
        _toggle('.search-area',1000);
      });
    };

    /*=====================================
        Header Control - Overlay Active
    ======================================*/
    var _headerControl = function() {
        $('.activeOverlay').click(function(e) {
            e.preventDefault();

            // Check Overlay
            setTimeout(function() {
              if($('.activeOverlay.highlight').length > 0){
                $('.web-overlay').fadeIn(500);
              }
              else {
                $('.web-overlay').fadeOut(500);
              }
            },100);


            // Check Highlight for Self
            if($(this).hasClass('highlight')){
              $(this).removeClass('highlight');
            }
            else{
              $('.activeOverlay').removeClass('highlight');
              $(this).addClass('highlight');
            }


            // Check control_dropdown
            var nextEle = $(this).next('.control_dropdown');
            if(nextEle.css('display') ===  'none'){
              $('.control_dropdown').fadeOut(500);
              nextEle.fadeIn(500);
            }else{
              nextEle.fadeOut(500);
            }

            // On overlay Hide Drop Down
            $('.web-overlay').click(function() {
              nextEle.fadeOut(500);
            });


        });


        // Initialize the Font Sizes
        $('.get-set-size').each(function(){
        	var fontSize = parseInt($(this).css('fontSize'));
          $(this).css('fontSize',fontSize);
          $(this).attr('data-normal-font',fontSize);

          var maxFont = fontSize+3;
          var minFont = fontSize-3;
          $(this).attr('data-max-font',maxFont);
          $(this).attr('data-min-font',minFont);
        });

        // Make Font Large
        $('#set-font-large').click(function(e) {
          e.preventDefault();
          	$('.get-set-size').each(function(){
                var fontSize = parseInt($(this).css('fontSize'));
                var maxSize = $(this).attr('data-max-font');
                if(fontSize < maxSize){
                	fontSize += 1;
                	$(this).css('fontSize',fontSize);
                }
            });
          $('*').trigger("change");
        });

        // Make Font Small
        $('#set-font-small').click(function(e) {
          e.preventDefault();
          $('.get-set-size').each(function(){
                var fontSize = parseInt($(this).css('fontSize'));
                var minSize = $(this).attr('data-min-font');
                if(fontSize > minSize){
                	fontSize -= 1;
                	$(this).css('fontSize',fontSize);
                }
            });
          $('*').trigger("change");
        });

        // Make Normal
        $('#set-font-normal').click(function(e) {
            e.preventDefault();
            //location.reload();
            $('.get-set-size').each(function(){
                var defaultSize = $(this).attr('data-normal-font')+'px';
                $(this).css('fontSize',defaultSize);
            });
        });

    };

    /*==========================
            Toggle Menu
    ============================*/
    var _toggleMenu = function() {
      // Prepend Menu
      $('body').prepend('<div class="main-nav-area responsive-menu"></div>');
      $('.main-header .menu').clone().appendTo(".responsive-menu");

      // Active Reponsive Menu
      $('.toggle-menu-btn').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('pushy-open-left');

        // Check Overlay
        _checkDisplayElement('.web-overlay');

        // Append Menu
        //$('html').css('overflow','hidden');

      });

      // Hide Responsive Menu
      $('.menu-close-button').click(function(e) {
          e.preventDefault();
          $('body').removeClass('pushy-open-left');
      });

    };


    /*==========================
            HOME GALLERY
    ============================*/
    var _homepageGallery = function() {
      var owl = $('#media-gallery-carousel');
      owl.owlCarousel({
          loop:true,
          margin:15,
          nav:true,
          items:3,
          dots:false,
          navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
      });
    };

    /*==========================
            OVERLAY
    ============================*/
    var _overlay = function() {
      $('body').on('click','.web-overlay',function(){
        $('.activeOverlay').removeClass('highlight');
        $('body').removeClass('pushy-open-left');
        _checkDisplayElement('.web-overlay');
        $('html').removeAttr('style');
        $('.sticky-mobile-menu').removeClass('active'); // add new
      });
      // Check overlay
      if($('.web-overlay').length < 1 ){
        $('.wrapper').prepend('<div class="web-overlay"></div>');
      }
    };

    /*===============================
          SET HOME WIDGET HEIGHTS
    =================================*/
    var _setHomeWidgetHeight = function() {

        //alert($(window).innerWidth());
        // ROW 1 ELEMENTS
        var row1 = '.home-widget-row-1 .block-body';
        var row2 = '.home-widget-row-2 .block-body';
        var row3 = '.home-widget-row-3';
        var row4 = '.home-widget-row-4 .block-body';
        var row5 = '.home-widget-row-5 .block-body';

        var eachRow = [row1,row2,row3,row4,row5];

        // Set on Change Font Size Height - Function
        function getHeight($ele) {
          var maxHeight = -1;
          $($ele).each(function() {
            maxHeight = maxHeight > $(this).innerHeight() ? maxHeight : $(this).innerHeight();
            getHeight = maxHeight;
          });
          $($ele).each(function(i) {
            $(this).css({'height':getHeight});
          });
        }

        // Bind Change - Function
        function changeBind($ele) {
          $($ele).bind('change',function() {
            getHeight($(this));
          });
        }

        // Trigger Resize
        $('*').resize(function() { $('*').trigger("change"); });

        if($(window).innerWidth() > 991 || $(window).width() > 991 ){
          // Onload Set Height
          setTimeout(function(){
            _setMinHeight(row1);
            _setMinHeight(row2);
            _setMinHeight(row3);
            _setMinHeight(row4);
            _setMinHeight(row5);
          },100);
          // On Change Set Height
          // changeBind(row1);
          // changeBind(row2);
          // changeBind(row3);
          // changeBind(row4);
          // changeBind(row5);
        }

        // Resize Check Change
        $(window).on('resize',function() {
            $(row1).removeAttr('style');
            $(row2).removeAttr('style');
            $(row3).removeAttr('style');
            $(row4).removeAttr('style');
            $(row5).removeAttr('style');
            if($(window).innerWidth() > 991 || $(window).width() > 991  ){
              _setMinHeight(row1);
              _setMinHeight(row2);
              _setMinHeight(row3);
              _setMinHeight(row4);
              _setMinHeight(row5);
            }
        });

    };

    /*===================
          GOTO TOP
    =====================*/
    var _gotoTop = function() {
      // Action
      $('body').on('click','.goto-top',function(e) {
        e.preventDefault();
         $("html, body").animate({ scrollTop: 0 }, 600);
      });
      // Check Visibility
      function checkWinToGoto(){
        if($(window).width() > 767){
          $(window).scroll(function() {
            if ( $(this).scrollTop() >= 350 ) {
              $('.goto-top').fadeIn(500);
            } else if ( $(this).scrollTop() <= 200 ) {
              $('.goto-top').fadeOut(500);
            }
          });
        }
      }

      checkWinToGoto();

      $(window).resize(function() {
        checkWinToGoto();
      });

    };

    /*========================
        STICKY LEFT OPTIONS
    ==========================*/
    var _stickyLeftOptions = function() {
      $('body').on('click',function(e) {
          $('.slm-menu li').removeClass('active');
          $('.sticy-left-menu').removeClass('active');
          $('.widget-options').removeClass('active');
      });

      $('body').on('click','.slm-menu li a',function(event) {
          event.stopPropagation();
          $('.sticy-left-menu').removeClass('active');
          $(this).closest('.sticy-left-menu').addClass('active');
          $($(this).attr('href')).addClass('active').siblings().removeClass('active');
          $(this).parent('li').addClass('active').siblings().removeClass('active');

      });

      $('.slm-body').click(function( event ) {
        event.stopPropagation();
      });
    };

    /*=================================
        MY PAGE WIDGET OPTIONS PANEL
    ===================================*/
    var _widgetToggle = function() {
      $('[data-display-widget]').on('change',function() {
            var getVal = $(this).attr('data-display-widget');
            $(this).is(":checked") ? $('#'+getVal).fadeIn(300) : $('#'+getVal).fadeOut(300);
      });

      $('.widget-options .handler').on('click',function( event ) {
        event.stopPropagation();
        $(this).closest('.widget-options').toggleClass('active');
      });

      $('.widget-options .wo-body').click(function( event ) {
        event.stopPropagation();
      });
    };

    /*======================
          Wheather
    ========================*/
    var _wheather = function() {
      var now = new Date();
      var dayNames = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday"];
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      $.simpleWeather({
          //woeid: '2357536', //2357536
          location: 'Dubai',
          unit: 'c',
          success: function(weather) {
            $("#wTemp").html(weather.temp+'&deg;c');
            $("#wSituation").html(weather.currently);
            $("#wMonthYear").html(monthNames[now.getMonth()]+' '+now.getFullYear());
            $("#wDay").html(dayNames[now.getDay()]);

            var url = "img/wheathers/default.jpg"
            if($("#wSituation:contains('Cloudy')").length)
            {
              url = "img/wheathers/cloudy.jpg";
            }
            else if($("#wSituation:contains('Sunny')").length)
            {
              //url = "img/wheathers/sunny.jpg";
            }
            else if($("#wSituation:contains('storm')").length)
            {
              //url = "img/wheathers/storm.jpg";
            }
            else if($("#wSituation:contains('rain')").length)
            {
              //url = "img/wheathers/rain.jpg";
            }

            //$("#weatherMain").css({"background":"url('"+url+"')","backgroundSize":"cover"});

            for(var i=1; i<=4; i++) {
              $('#wTemp'+i).html(weather.forecast[i].high+'&deg;c');
              $('#wSituation'+i).html(weather.forecast[i].text);
              $('#wDay'+i).html(weather.forecast[i].day);
              //html += '<p>'+weather.forecast[i].day+'-'+ weather.forecast[i].text+'-'+weather.forecast[i].high+'</p>';
            }
          },

          error: function(error) {
            console.log('Weather error');
          }
        });
    };

    /*======================
         CHECK LANGUAGE
    ========================*/
  	var _languageCheck = function(){
  		($('html').attr('dir') == 'ltr') ? $('body').addClass('lang-eng') : $('body').addClass('lang-arb');
  	};


    /*======================
        HOVER TABS
    ========================*/
    var _hoverTabs = function() {
      $('#nav-services  li  a').hover(function() {
        $(this).tab('show');
      });
      $('body').on('click','#nav-services  li  a',function() {
          var getLocation = $(this).attr('href');
          window.location = getLocation;
      });
    };

    /*==============================
         Card List - Newsletters
    ===============================*/
    var _cardLists = function(){

    	$('#newsletter_grid').newsletter_grid({
	      no_columns: 3,
	      padding_x: 10,
	      padding_y: 10,
	      margin_bottom: 50,
	      single_column_breakpoint: 640,
	      double_column_breakpoint: 700,
      });

      $('#discussion_grid').newsletter_grid({
	      no_columns: 3,
	      padding_x: 10,
	      padding_y: 10,
	      margin_bottom: 50,
	      single_column_breakpoint: 640,
	      double_column_breakpoint: 700,
      });

      $('#specialOffer_grid').newsletter_grid({
	      no_columns: 3,
	      padding_x: 10,
	      padding_y: 10,
	      margin_bottom: 50,
	      single_column_breakpoint: 640,
	      double_column_breakpoint: 700,
      });

      $('#events_grid').newsletter_grid({
	      no_columns: 3,
	      padding_x: 10,
	      padding_y: 10,
	      margin_bottom: 50,
	      single_column_breakpoint: 640,
	      double_column_breakpoint: 700,
      });



    };


    /*======================
        STICKY NOTES
    ========================*/
    var _stickyNotes = function() {
        ($('#stickyNotePanel').length>0) ? $('#stickyNotePanel').jqte() : '';
    };

    /*===========================
          MOBILE STICKY MENU
    ============================*/
    var _mobileStickyMenu = function() {
      var list = $('.sticy-left-menu .slm-menu ul').html();
      var listAll = $('.sticy-left-menu .slm-menu ul').html();

      //console.log('List: '+ listSocial + listAll);


      $('body').append('<div class="sticky-mobile-menu visible-xs"><nav class="smm-menu"><ul></ul></nav></div>');
      $('.sticky-mobile-menu .smm-menu ul').append(list);

      // Add Tabs
      var htmlContent = $('.sticy-left-menu .slm-body').html();
      $('.sticky-mobile-menu').prepend('<div class="wrap"><div class="smm-body tab-content">' + htmlContent + '<a class="smm-close" href="#close"><i class="fa fa-times"></i></a></div></div>');

      // Close
      $('body').on('click','.sticky-mobile-menu .smm-close',function(e) {
        e.preventDefault();
        $('.sticky-mobile-menu').removeClass('active');
        $('.web-overlay').fadeOut(300);
      });

      // Open Panel
      $('body').on('click','.sticky-mobile-menu .smm-menu li a',function(e) {
        e.preventDefault();
        if(!$('.sticky-mobile-menu').hasClass('active')){
          $('.sticky-mobile-menu').addClass('active');
          _checkDisplayElement('.web-overlay');
        }
      });

      // Change Ids
      $('.sticky-mobile-menu .tab-content .tab-pane').each(function(i) {
          $(this).attr('id',$(this).attr('id')+2)
      });

      $('.sticky-mobile-menu .smm-menu > ul > li > a').each(function(i) {
          $(this).attr('href',$(this).attr('href')+2)
      });


    }


    return {
        init: function(){
            //_toster();
            _datepicker();
            _stickyHeader();
            _toggleSearchArea();
            _headerControl();
            _toggleMenu();
            _overlay();
            _homepageGallery();
            _setHomeWidgetHeight();
            _gotoTop();
            _stickyLeftOptions();
            _widgetToggle();
            _wheather();
            _languageCheck();
            _hoverTabs();
            _cardLists();
            _stickyNotes();
            setTimeout(function() {
              _mobileStickyMenu();
            },1000);
        },
        toster: function(text) {
          function ToastBuilder(options) {
            // options are optional
            var opts = options || {};

            // setup some defaults
            opts.defaultText = opts.defaultText || 'default text';
            opts.displayTime = opts.displayTime || 3000;
            opts.target = opts.target || 'body';

            return function (text) {
              $('<div/>')
                .addClass('toast')
                .prependTo($(opts.target))
                .text(text || opts.defaultText)
                .queue(function(next) {
                  $(this).css({
                    'opacity': 1
                  });
                  var topOffset = 15;
                  $('.toast').each(function() {
                    var $this = $(this);
                    var height = $this.outerHeight();
                    var offset = 15;
                    $this.css('top', topOffset + 'px');

                    topOffset += height + offset;
                  });
                  next();
                })
                .delay(opts.displayTime)
                .queue(function(next) {
                  var $this = $(this);
                  var width = $this.outerWidth() + 20;
                  $this.css({
                    'right': '-' + width + 'px',
                    'opacity': 0
                  });
                  next();
                })
                .delay(600)
                .queue(function(next) {
                  $(this).remove();
                  next();
                });
            };
          }

          // customize it with your own options
          var myOptions = {
            defaultText: 'Toast, yo!',
            displayTime: 3000,
            target: 'body'
          };
            //position: 'top right',   // TODO: make this */
            //bgColor: 'rgba(0,0,0,0.5)', // TODO: make this */

          // to get it started, instantiate a copy of
          // ToastBuilder passing our custom options
          var showtoast = new ToastBuilder(myOptions);

          return showtoast(text);
          /*
          showtoast($('#textbox').val());

          $('body')
          .queue(function(next) {
            showtoast('Hey look, toast!');
            next();
          }).delay(100)
          .queue(function(next) {
            showtoast('Sweet!');
            next();
          })
          .delay(500);
          */
        },
    }
}();

$(document).ready(function(){
    App.init();

    // Create a deferred object
    var dfd = $.Deferred();

    dfd.done(preloader()).done(App.toster('Test Toast'));


    $('body')
    .queue(function(next) {
      App.toster('Hey look, toast!');
      next();
    }).delay(100)
    .queue(function(next) {
      App.toster('Sweet!');
      next();
    })
    .delay(500);

    $('#news-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        autoplay:3000,
        items:1,
        dots:false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });

    $('#eservices-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items:1,
        dots:false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });

    $('#upcomming-holidays').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items:1,
        dots:false,
        autoplay:1000,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });

    $('#quicklinks-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        items:3,
        dots:false,
        autoplay:1000,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });

    $('#footer-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        items:1,
        dots:false,
        autoplay: true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });

    $('#department-gallery').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items:4,
        dots:false,
        autoplay: false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive :{
          768 :{
            items:4
          },
          767 : {
            items:2
          },
          640 : {
            items:2
          },
          320 : {
            items:1,
            margin:0,
          }
        }
    });

    $('#video-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        items:4,
        dots:false,
        autoplay: false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive :{
          768 :{
            items:4
          },
          767 : {
            items:2
          },
          640 : {
            items:2
          },
          320 : {
            items:1,
            margin:0,
          }
        }
    });

    $('#mypage-news-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        items:1,
        dots:false,
        autoplay: true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });

    $('#mypage-spcial-offers-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        items:1,
        dots:false,
        autoplay: true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });



    // Initialize WOW JS
    //new WOW().init();


    $(".scroll").mCustomScrollbar({
      scrollButtons:{enable:true},
      theme:"dark",
      //scrollbarPosition:"outside"
    });


    // Video Gallery Page
    $('#videoGallery').lightGallery({
      loadYoutubeThumbnail: true,
      youtubeThumbSize: 'default',
      loadVimeoThumbnail: true,
      vimeoThumbSize: 'thumbnail_medium',
      selector: '.item',
      thumbnail:false
    });

    $('#video-carousel').lightGallery({
      loadYoutubeThumbnail: true,
      youtubeThumbSize: 'default',
      loadVimeoThumbnail: true,
      vimeoThumbSize: 'thumbnail_medium',
      selector: '.item',
      thumbnail:false
    });


}); // end document ready

window.onload = function() {

  setTimeout(function(){
    preloader();
  },3000);

}; // end window.load

function preloader(){
  $('.preloader').fadeOut(300);
}

// Toggle Element
function _toggle($ele,$duration) {
  if($($ele).hasClass('active')){
    $($ele).slideDown($duration);
  }
  else{
    $($ele).slideUp($duration);
  }
  $($ele).toggleClass('active');
}

// Check Overlay
function _checkDisplayElement($ele){

  if($($ele).css('display') == 'none' ){
    $($ele).fadeIn(1000);
  }
  else {
    $($ele).fadeOut(1000);
  }

}

// Get Max Height & Set Min Height
function _setMinHeight($ele) {
    var maxHeight = -1;
    var height = -1;
    $($ele).each(function() {
      maxHeight = maxHeight > $(this).innerHeight() ? maxHeight : $(this).innerHeight();
      height = maxHeight;
    });

    $($ele).each(function(i) {
      $(this).css({'minHeight':maxHeight,'height':height*1.001});
      //console.log(' ROW'+i+': '+ maxHeight);
    });

}
