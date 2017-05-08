var express = require('express');
var app = express();

app.use('/indicadores', require('./routes/indicadores'));

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
