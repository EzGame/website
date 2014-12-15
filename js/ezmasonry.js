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
    $(elem).find('img').css({
      'height': $rowHeight,
      'width': 'auto',
    });
    $(elem).css({
      'position':'absolute',
      'margin-top': $rowIndexHeight,
      'margin-left': $rowWidthHolder[$rowIndex]
    });
    $rowWidthHolder[$rowIndex] += $(elem).width();

    // if this is last time, try and find furthest point and add padding
    if(index == $ezMasonry.find('.project').length - 1) {
      if ($rowWidthHolder[$rowIndex] > $rowWidthHolder[Math.abs($rowIndex-1)]){
        $(elem).css({
          'padding-right': $ezMasonry.css('padding')
        });
      } else {
        $(elem).prev('.project').css({
          'padding-right': $ezMasonry.css('padding')
        });
      }
    }
  });

});