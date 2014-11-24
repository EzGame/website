/* intro */
$(document).ready(function () {
  $winWidth = $(window).width();
  $winHeight = $(window).height();
  $('.full-page').height($winHeight + 50);
})

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