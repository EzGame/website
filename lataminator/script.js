var product_html = "";
product_html += "  <img class=\'product-grid-img\'/>"

function dataFiller() {
  // var ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  // if (/msie|trident/i.test(ua)) {
  //   var items = document.querySelectorAll(".col-0 a");
  //   Array.prototype.forEach.call( items, function(node) {
  //     node.parentNode.removeChild( node )
  //   });

  //   items = document.querySelectorAll(".col-1 a");
  //   Array.prototype.forEach.call( items, function(node) {
  //     node.parentNode.removeChild( node )
  //   });
  // }

  if (window.status != 'SUCCESS') {
    alert("Bad item feed!");
    return;
  }
  var items = window.items;

  // sort items based on priority
  // allItems.sort(function(a,b){
  //   return a.priority - b.priority;
  // });

  // populate columns
  var columns = $('.product-columns');
  for(var i = 1; i < items.length; i++) {
    // var container = $('<a class="product-container"></a>');
    // container.attr('href', allItems[i].product_link);
    var container = $('<div class=\'product-grid\'></div>');
    container.html(product_html);
    container.attr('data-price',items[i].price);
    container.find('img.product-grid-img').attr('src',items[i].img);

    columns.append(container);
    // $('.col-' + columnNumber).append(container);
  }
};

function updateValue(value) {
  $('#budget-slide').attr('value',value);
  $('#budget-text').attr('value',value);
};

function updateData(value) {
  var timer_counter = 0;
  $('.product-columns').find('.product-grid').each(function(){
    if ($(this).data('price') > value) {
      $(this).toggle();
      // setTimeout(function(){
      //   $(this).addClass('hide');
      // },timer_counter * 500);
      // timer_counter++;
      // $(this).addClass('animated fadeOut');
      // $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      //   $(this).addClass('hide');
      //   $(this).removeClass('animated fadeOut');
      // });
    } else if ($(this).hasClass('hide')) {
      $(this).toggle();
      // $(this).removeClass('hide');
      // $(this).removeClass('hide');
      // $(this).addClass('animated fadeIn');
      // $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      //   $(this).removeClass('animated fadeIn');
      // });
    }
  });
}

function init() {
  /* Bypass Origin Null */
  dataFiller();
  // var script_tag = $("<script></script>");
  // script_tag.attr("type","text/javascript");
  // script_tag.attr("src","data.js");
  // script_tag.load(function(){
  //   dataFiller();
  // });
  // $("head").append(script_tag);
};