function loadSessions(parent, x, y) {
  var margin = {top: 10, right: 10, bottom: 100, left: 40},
      margin2 = {top: 330, right: 10, bottom: 20, left: 40},
      margin3 = {top: 430, right: 10, bottom: 30, left: 40},
      width = x - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom,
      height2 = 400 - margin2.top - margin2.bottom,
      height3 = 700 - margin3.top - margin3.bottom;

  var parseDate = d3.time.format("%Y-%m-%d-%H-%M").parse;
  var x = d3.time.scale().range([0, width]),
      x2 = d3.time.scale().range([0, width]),
      x3 = d3.time.scale().range([0, width]),
      y = d3.scale.linear().range([height, 0]),
      y2 = d3.scale.linear().range([height2, 0]),
      y3 = d3.scale.linear().range([height3, 0]);

  var xAxis = d3.svg.axis().scale(x).orient("bottom"),
      xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
      xAxis3 = d3.svg.axis().scale(x3).orient("bottom"),
      yAxis = d3.svg.axis().scale(y).orient("left");
      yAxis3 = d3.svg.axis().scale(y3).orient("left");

  var color = d3.scale.category20();

  var brush = d3.svg.brush()
      .x(x2)
      .on("brush", brushed);

  var area = d3.svg.area()
      .interpolate("monotone")
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.sessions); });

  var area2 = d3.svg.area()
      .interpolate("monotone")
      .x(function(d) { return x2(d.date); })
      .y0(height2)
      .y1(function(d) { return y2(d.sessions); });

  var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x3(d.date); })
      .y(function(d) { return y3(d.beacons); });

  var svg = parent.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", 750);

  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

  var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" +
        margin.left + "," + margin.top + ")");

  var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" +
        margin2.left + "," + margin2.top + ")");

  var focus2 = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" +
        margin3.left + "," + margin3.top + ")");

  d3.csv("data/sessions.csv", type, function(error, data) {
    x.domain(d3.extent(data.map(function(d) { return d.date; })));
    y.domain([0, d3.max(data.map(function(d) { return d.sessions; }))]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    focus.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("TOTAL SESSIONS");

    context.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area2);

    context.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "x brush")
        .call(brush)
      .selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7);

    context.append("g")
        .attr("class", "x brush")
        .call(brushed2)
      .selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7);

    // lines
    color.domain(d3.keys(data[0]).filter(
      function(key) {
        return key !== "date" && key != "sessions" && key != "duration" && key != "opens";
      })
    );

    var cities = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {date: d.date, beacons: +d[name]};
        })
      };
    })

    x3.domain(x.domain());
    y3.domain([0.6, 2]);

    focus2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height3 + ")")
        .call(xAxis3);

    focus2.append("g")
        .attr("class", "y axis")
        .call(yAxis3)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("AVG BEACONS/USER");

    var city = focus2.selectAll(".city")
        .data(cities)
        .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.name); });

    city.append("text")
        .datum(function(d) {
          return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d)
          { return "translate(" + (x3(d.value.date) - 20) + "," + y3(d.value.beacons) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });
  });

  function brushed() {
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    focus.select(".area").attr("d", area);
    focus.select(".x.axis").call(xAxis);
  }

  function brushed2() {
    x2.domain(brush.empty() ? x2.domain() : brush.extent());
    focus2.select(".line").attr("d", line);
    focus2.select(".x.axis").call(xAxis3);
  }

  function type(d) {
    d.date = parseDate(d.date);
    d.sessions = +d.sessions;
    return d;
  }

  return svg;
}