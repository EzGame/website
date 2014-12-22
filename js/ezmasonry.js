/* EZ-MASONRY */
$(document).ready(function() {
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
    // look for which row to put it in
    $rowIndex = ($rowWidthHolder[0] > $rowWidthHolder[1]) ? 1 : 0;
    $rowIndexHeight = $rowIndex * $rowHeight;

    // set img css
    $(elem).find('.project-img').css({
      'height': $rowHeight,
      'width': 'auto',
    });

    // set parent css
    $(elem).css({
      'position':'absolute',
      'margin-top': $rowIndexHeight,
      'margin-left': $rowWidthHolder[$rowIndex],
      'overflow': 'hidden'
    });
    $(elem).hover(function() {
      $(this).find('.project-hover').css('left','0%');
    }, function() {
      $(this).find('.project-hover').css('left','70%');
    });
    $rowWidthHolder[$rowIndex] += $(elem).width();

    // set hover css
    $(elem).find('.project-hover').css({
      'width': $(elem).width(),
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
        'margin-left': $paddingLeftPos,
      })
      $ezMasonry.append($padding);
    }
  });

});