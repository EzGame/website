/**
 * A wrapper for d3, creates D3Module and renders them into a parent
 */
var D3ModuleType = {
  Sessions: 1,
  FillGauges: 2,
}

var D3Module = function(parent, type) {
  this.id = -1;
  this.type = type || null;
  this.src = null;
  this.parent = parent || null;
  this.jObj = null;
  this.dObj = null;
  this.svgArr = [];
  this.redrawTimer = 5000;
  this.redrawInterval = null;
};


/**
 *
 */
D3Module.prototype.renderToScreen = function(id) {
  if (this.parent != null &&
      this.type != null &&
      this.svg == null) {
    var className;
    switch(this.type) {
      case D3ModuleType.Sessions:
        className = 'sessions';
        break;
      case D3ModuleType.FillGauges:
        className = 'fillgauges';
        break;
    }

    // create node
    var node = document.createElement('div');
    node.className = 'module-container ' + className;

    // append into DOM
    this.parent.append($(node));
    this.jObj = this.jObj || $(node);
    this.dObj = this.dObj || d3.select(node);
    this.id = id;

    // run our create method
    switch(this.type) {
      case D3ModuleType.Sessions:
        this.createSessions(id); break;
      case D3ModuleType.FillGauges:
        this.createFillGauge(id); break;
    }
    freename = this;
    if (this.redrawTimer != 0) {
      this.redrawInterval = setInterval(function() {
        freename.redraw();
      }, freename.redrawTimer);
    }
  }
};


/**
 *
 */
D3Module.prototype.createFillGauge = function(data, options) {
  // Get some size variables
  var opts = (typeof options === 'undefined') ? {} : options;
  var x = this.jObj.width(),
      y = this.jObj.height();
  var config1 = liquidFillGaugeDefaultSettings();
  config1.circleColor = opts.circleColor || '#d7d7d7';
  config1.textColor = opts.textColor || '#00c6d7';
  config1.waveTextColor = opts.waveTextColor || '#2d3a43';
  config1.waveColor = opts.waveColor || '#00c6d7';
  config1.waveAnimateTime = opts.waveAnimateTime || 750;

  var config2 = liquidFillGaugeDefaultSettings();
  config2.circleColor = opts.circleColor || '#d7d7d7';
  config2.textColor = opts.textColor || '#7bc64d';
  config2.waveTextColor = opts.waveTextColor || '#333333';
  config2.waveColor = opts.waveColor || '#7bc64d';
  config2.waveAnimateTime = opts.waveAnimateTime || 750;

  this.jObj.append('<div class="title-container"><div class="flyers left col2"></div><div class="flipp right col2"></div></div>');
  var svg = this.dObj.append("svg")
      .classed({'right':true,'col2':true})
      .attr("width", (x-200)/2)
      .attr("height", 200);
  var svg2 = this.dObj.append("svg")
      .classed({'left':true,'col2':true})
      .attr("width", (x-200)/2)
      .attr("height", 200);

  this.src =
      "http://54.196.31.61:7379/HGETALL/" + $merchantpicker.children().val();

  // get data
  $.ajax({
    type:'POST',
    url: this.src,
    dataType: "jsonp",
    success: function(json) {
      if (typeof json.HGETALL !== 'undefined') {
        loadLiquidFillGauge(svg,
          json.HGETALL.flipp * 31/json.HGETALL.max_flipp,
          config1);
        loadLiquidFillGauge(svg2,
          json.HGETALL.flyers * 31/json.HGETALL.max_flyers,
          config2);
      }
    }
  });

  this.svgArr.push(svg);
  this.svgArr.push(svg2);
};

var lol = 0
D3Module.prototype.redraw = function() {
  // get data
  $.ajax({
    type:'POST',
    url: this.src,
    dataType: "jsonp",
    success: function(json) {
      if (typeof json.HGETALL !== 'undefined') {
        updateFillHeight(freename.svgArr[0],
            (parseInt(json.HGETALL.flipp) + lol++)*0.31/json.HGETALL.max_flipp);
        updateFillHeight(freename.svgArr[1],
            (parseInt(json.HGETALL.flyers) + lol++)*0.31/json.HGETALL.max_flyers);
      }
    }
  });
}


/**
 *
 */
D3Module.prototype.createSessions = function(id) {
  // Get some size variables
  var x = this.jObj.width(),
      y = 700;

  // run and save
  var svg = loadSessions(this.dObj, x, y);
  this.svgArr.push(svg);
};


D3Module.prototype.destroy = function(){
  console.log("destroy");
  window.clearInterval(this.redrawInterval);
}