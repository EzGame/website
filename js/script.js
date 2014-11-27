/* intro */
$(document).ready(function () {
  $winWidth = $(window).width();
  $winHeight = $(window).height();
  $('.full-page').height($winHeight + 50);

  /* Quirky animations */
  $('#intro').mouseenter(function() {
    $(this).transition({
      rotateX:'360deg'
    }, 1000, 'easeInSine');
  }).mouseout(function() {
    $(this).transition({
      rotateX:'0deg'
    }, 1000, 'easeOutSine');
  });

  (function loop(){
    $('#dodecahedron').transition({
      rotateY:'+=10deg',
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