$(document).ready(function () {
  /* Backstretch */
  $('#page1').backstretch('img/mac.jpg');
  $('#page2').backstretch('img/mac2.jpg');
  $('#page3').backstretch('img/cafe.jpg');


  /* Quirky animations */
  $('#intro').mouseenter(function() {
    $(this).transition({
      rotateX:'360deg'
    }, 1000, 'easeInSine');
  }).mouseleave(function() {
    $(this).transition({rotateX:'0deg'}, 0);
  });

  $('#work').mouseenter(function() {
    $(this).transition({
      rotateY:'360deg'
    }, 1000, 'easeInSine');
  }).mouseleave(function() {
    $(this).transition({rotateY:'0deg'}, 0);
  });

  $('#projects').mouseenter(function() {
    $(this).transition({
      rotate:'360deg'
    }, 1000, 'easeInSine');
  }).mouseleave(function() {
    $(this).transition({rotate:'0deg'}, 0);
  });


  /* Menu functions */
  $('a.header-link').click(function() {
    // scroll to id
  });


  /* Dodecahedron */
  $('#do-cover').mousedown(function() {
    console.log("HI");
  }).mousedown(function() {
    console.log("HELLO");
    $('#dodecahredron').transition({
      rotateY:'0deg',
      rotateX:'0deg'
    }, 1000, 'linear');
  }).mouseover(function() {
    console.log("yep");
  }).mouseup(function() {
    console.log("BYE");
  });

  (function loop(){
    $('#dodecahedron').transition({
      rotateY:'+=10deg',
      rotateX:'+=1deg',
    }, 1000, 'linear', loop);
  })();


  /* Scroll handler */
  $winWidth = $(window).width();
  $winHeight = $(window).height();
  $header = $('#header');
  $footer = $('#footer');
  $(window).scroll(function() {
    $position = $(window).scrollTop();
    if ($position == 0) {
      $header.removeClass('animated fadeOut','');
      $header.addClass('animated fadeIn');
    } else if ($position > 0 && !$header.hasClass('fadeOut')) {
      $header.removeClass('animated fadeIn','');
      $header.addClass('animated fadeOut');
    } else if ($position + window.innerHeight >= $winHeight) {
      $footer.removeClass('animated fadeOut','');
      $footer.addClass('animated fadeIn');
    } else if ($position + window.innerHeight < $winHeight && !$footer.hasClass('fadeOut')) {
      $footer.removeClass('animated fadeIn','');
      $footer.addClass('animated fadeOut');
    }
  });
});