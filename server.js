/* EZDZ.io */
var express = require('express');
var compression = require('compression');
var nodemailer = require('nodemailer');
var cacheTime = 86400000; // one day

// Create server using express
var app = express();
var smtp = nodemailer.createTransport("SMTP", {
  service: 'gmail',
  auth: {
    user: process.env.EMAILADDR,
    pass: process.env.EMAILPASS
  }
});

// Compress static assets
app.use(compression());

// Send static assets with caching
app.use(express.static(__dirname, {maxAge: cacheTime}));

// GET: Reroute default to index.html
app.get('/', function(request, response) {
  response.sendfile('index.html');
});

// POST: Email route to me!
app.post('/send', function(request, response) {
  var mail = {
    to: 'zyq.david@gmail.com',
    subject: '[EZDZ.io] ' + request.query.title,
    text: request.query.subject + '\n\nFROM: ' + request.query.from
  };
  smtp.sendMail(mail, function(error, idleResponse) {
    response.end((error) ? "error" : "sent");
  });
});

// Listen on environment port or 3000
app.listen(process.env.PORT || 3000, function(){
  console.log("Express Started on port 3000");
});
