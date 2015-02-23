$(document).ready(function () {
  /* Backstretch */
  $('#page1').backstretch('img/mac.jpg');
  $('#page2').backstretch('img/cafe.jpg');
  $('#page3').backstretch('img/mac2.jpg');

  /* Quirky animations */
  $('#intro').mouseenter(function() {
    $(this).transition({
      rotateX:'+=360deg'
    }, 1000, 'easeInSine');
  });

  $('#projects').mouseenter(function() {
    $(this).transition({
      rotateY:'+=360deg'
    }, 1000, 'easeInSine');
  });

  /* Menu functions */
  $('a.header-link').click(function() {
    // scroll to id
  });

  /* Dodecahedron */
  $dodecahedron = $('#dodecahedron');
  $('#do-cover').mousedown(function() {
    console.log("HI");
  }).mousedown(function() {
    console.log("HELLO");
    $dodecahedron.transition({
      rotateY:'0deg',
      rotateX:'0deg'
    }, 1000, 'linear');
  }).mouseover(function() {
    console.log("yep");
  }).mouseup(function() {
    console.log("BYE");
  });

  (function loop(){
    $dodecahedron.transition({
      rotateY:'+=10deg',
      rotateX:'+=1deg'
    }, 1000, 'linear', loop);
  })();

  /* Scroll handler */
  $winWidth = $(window).width();
  $winHeight = $(window).height();
  $window = $(window);
  $header = $('#header');
  $footer = $('#footer');
  $window.scroll(function() {
    $position = $window.scrollTop();
    if ($position <= 50) {
      $header.removeClass('animated fadeOut','');
      $header.addClass('animated fadeIn');
    } else if ($position > 0 && !$header.hasClass('fadeOut')) {
      $header.removeClass('animated fadeIn','');
      $header.addClass('animated fadeOut');
    } else if ($position + window.innerHeight >= $winHeight - 50) {
      $footer.removeClass('animated fadeOut','');
      $footer.addClass('animated fadeIn');
    } else if ($position + window.innerHeight < $winHeight
        && !$footer.hasClass('fadeOut')) {
      $footer.removeClass('animated fadeIn','');
      $footer.addClass('animated fadeOut');
    }
  });

  /* Mailer */
  $('#send').click(function() {
    var title = $('#title');
    var body = $('#body');
    var from = $('#from');
    var message = $('#message');
    var error = 0;
    if (title.val() == "") {
      title.addClass("missing");
      error = 1;
    } else {
      title.removeClass("missing");
      error = 0;
    }
    if (body.val() == "") {
      body.addClass("missing");
      error = 1;
    } else {
      body.removeClass("missing");
      error = 0;
    }

    if (error) {
      message.text("I'm missing some information.");
      message.addClass('bounce');
      message.one('webkitAnimationEnd ' +
          'mozAnimationEnd ' +
          'MSAnimationEnd ' +
          'oanimationend ' +
          'animationend', function() {
        message.removeClass('bounce');
      });
      return;
    }

    $.post('/send', {
      title: title.val(),
      body: body.val(),
      from: from.val()
    }, function(data) {
      if (data == 'sent' || 1) {
        if (from.val() == "") {
          message.text("Thank you for the message :)");
        } else {
          message.text("Thank you, I'll get back to you ASAP");
        }
        message.addClass('fadeIn');
        $('#email-wrapper').hide();
      } else {
        message.text("Oops, something went wrong :(");
        message.addClass('shake');
        message.one('webkitAnimationEnd ' +
            'mozAnimationEnd ' +
            'MSAnimationEnd ' +
            'oanimationend ' +
            'animationend', function() {
          message.removeClass('shake');
        });
      }
    });
  });

  /* EZMASONARY */
  // 1st set some css
  $ezMasonry = $('#ez-masonry');
  $ezMasonry.css({
    'position': 'absolute',
    'overflow-x':'scroll',
    'height': '100%',
    'width': '100%',
    'left': '0px',
    'top': '0px',
    'padding': '5%'
  });

  // 2nd get environment variables
  $containerHeight = $ezMasonry.height();
  $containerWidth = $ezMasonry.width();
  $rowHeight = $containerHeight/2;
  $rowWidthHolder = [0,0];

  // 3rd set item and image css based on width
  $ezMasonry.find('.project').each(function(index, elem) {
    $(elem).find('.project-img').load(function() {
      // look for which row to put it in
      $rowIndex = ($rowWidthHolder[0] > $rowWidthHolder[1]) ? 1 : 0;
      $rowIndexHeight = $rowIndex * $rowHeight;

      // set img css
      $(elem).find('.project-img').css({
        'height': $rowHeight,
        'width': 'auto'
      });

      // set parent css
      $(elem).css({
        'position':'absolute',
        'margin-top': $rowIndexHeight,
        'margin-left': $rowWidthHolder[$rowIndex],
        'overflow': 'hidden'
      });
      $(elem).hover(function() {
        $(elem).find('.project-hover').css('left','0%');
      }, function() {
        $(elem).find('.project-hover').css('left','70%');
      });
      $rowWidthHolder[$rowIndex] += $(elem).width();

      // set hover css
      $(elem).find('.project-hover').css({
        'width': $(elem).width()
      });

      // if this is last time, try and find furthest point and add padding
      if(index == $ezMasonry.find('.project').length - 1) {
        $padding = $('<div></div>');
        $paddingLeftPos = Math.max($rowWidthHolder[0], $rowWidthHolder[1]);
        $paddingTopPos =
            ($paddingLeftPos == $rowWidthHolder[0]) ? 0 : $rowHeight;

        $padding.css({
          'width': $ezMasonry.css('padding'),
          'height': $rowHeight,
          'margin-top': $paddingTopPos,
          'margin-left': $paddingLeftPos
        });
        $ezMasonry.append($padding);
      }
    });
  });
});