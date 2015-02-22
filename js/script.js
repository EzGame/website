$(document).ready(function () {
  /* Backstretch */
  $('#page1').backstretch('img/mac.jpg');
  $('#page2').backstretch('img/mac2.jpg');
  $('#page3').backstretch('img/cafe.jpg');

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
  $dodechaedron = $('#dodecahredron');
  $('#do-cover').mousedown(function() {
    console.log("HI");
  }).mousedown(function() {
    console.log("HELLO");
    $dodechaedron.transition({
      rotateY:'0deg',
      rotateX:'0deg'
    }, 1000, 'linear');
  }).mouseover(function() {
    console.log("yep");
  }).mouseup(function() {
    console.log("BYE");
  });

  (function loop(){
    $dodechaedron.transition({
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
    var title = $('#title').val();
    var body = $('#body').val();
    var from = $('#from').val();
    // TODO: error handling
    console.log("sending");
    $.post('/send', {
      title: title,
      body: body,
      from: from
    }, function(data) {
      // TODO: Hide mailer if it worked
      if (data == 'sent')
        console.log('complete');
      else
        console.log('error');
    });
  });
});