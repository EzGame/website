var $doc = $(document);
var $win = $(window);
var $modules = [];

$doc.on('ready', function() {
  $header = $('#header');
  $main = $('#main');
  $mainContainer = $('.main-container');
  $datepicker = $('#datepicker');
  $merchantpicker = $('#merchantpicker');
  $flyerrunpicker = $('#flyerrunpicker');
  $datecalender = $('#datecalender');
  $datedisplay = $('#datedisplay');
  $dashboard = $('#dashboard');

  // Initialize
  $mainContainer.css('height', $win.height() - $header.height());

  $win.on('resize', function (){
    $mainContainer.css('height', $win.height() - $header.height());
  });

  today = new Date()

  $datedisplay.html(today.toDateString());
  $datecalender.DatePicker({
    flat: true,
    date: [today],
    format: 'd B, Y',
    calendars: 2,
    mode: 'range',
    onBeforeShow: function(formated) {
      $datedisplay.html('Save date preference');
    },
    onHide: function(formated){
      console.log(formated)
    },
  });
  $datedisplay.on('click', function() {
    if ($datecalender.hasClass('hidden')) {
      $datecalender.removeClass('hidden');
      $datecalender.DatePickerShow();
    } else {
      $datecalender.addClass('hidden');
      var dates = jQuery.map($datecalender.DatePickerGetDate(), function(a) {
        return (new Date(a)).toDateString();
      })
      $datedisplay.html(dates.join(' - '));
    }
  });

  $('.sidebar-section').on('click', function() {
    $dashboard.empty();
    $.each($modules, function() {
      this.destroy();
    })
    $modules = []
    if ($(this).data('value') == '3') {
      $dashboard.append(
        '<div id="map-wrapper"><div id="google-sidenav"></div><div id="google-map"></div></div>');
      initializeMap();
    } else {
      var module = new D3Module($dashboard, $(this).data('value'));
      module.renderToScreen($modules.length);
      $modules.push(module);
    }
  });

  $('#intro').on('click', function() {
    $('.intro').addClass('animated fadeOut');
    $('.intro').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.intro').hide();
    });
  });

  $('.intro').on('click', function() {
    $('#intro').removeClass('hidden');
    $('#intro').addClass('animated fadeIn');
  });

  var svg = d3.select('dashboard').attr('width', 500).attr('height',500);
  var g = svg.append("g").attr("id", "fsa");
  d3.json("data/output.json", function (error, json) {
    svg.append("path")
        .datum(topojson.feature(json, json.objects.subunits));
        // .attr("d",d3.geo.path().projection(d3.geo.mercator()));
  });
});



