/* intro */
$(document).ready(function () {
  $winWidth = $(window).width();
  $winHeight = $(window).height();
  $doDrag = true;
  $('#page1').backstretch('img/mac.jpg');
  $('#page2').backstretch('img/mac2.jpg');
  $('#page3').backstretch('img/cafe.jpg');

  /* Quirky animations */
  $('#intro').mouseenter(function() {
    $(this).transition({
      rotateX:'360deg'
    }, 1000, 'easeInSine');
  }).mouseleave(function() {
    $(this).transition({
      rotateX:'0deg'
    }, 1000, 'easeOutSine');
  });

  $('a.header-link').click(function() {
    // scroll to id
  });

  $('#do-cover').mousedown(function() {
    console.log("HI");
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
});

$(window).scroll(function() {
  $position = $(window).scrollTop();
  $header = $('#header');
  if ($position == 0) {
    $header.attr('class','');
    $header.addClass('animated fadeIn');
  } else if ($position > 0 && !$header.hasClass('fadeOut')) {
    $header.attr('class','');
    $header.addClass('animated fadeOut');
  }
});


// $('#intro').mouseover(function() {
//   $(this).animate({
//     -webkit-transform: rotateX(360),
//     -moz-transform: rotateX(360),
//     -ms-transform: rotateX(360)
//   }, 2000, 'swing', function() {
//     $(this).css({
//       -webkit-transform: rotateX(0),
//       -moz-transform: rotateX(0),
//       -ms-transform: rotateX(0)
//     })
//   });
// });