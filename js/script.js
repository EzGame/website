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
    } else if ($position + window.innerHeight < $winHeight && !$footer.hasClass('fadeOut')) {
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
});