var express = require('express')
var cors = require('cors')

var app = express();

app.use(cors());

app.use('/indicadores', require('./routes/indicadores'));
app.use('/pilares', require('./routes/pilares'));
app.use('/tipos', require('./routes/tipos'));
app.use('/niveis', require('./routes/niveis'));
app.use('/subniveis', require('./routes/subniveis'));
app.use('/itens', require('./routes/itens'));
app.use('/pontuacoes', require('./routes/pontuacoes'));
app.use('/criteriosLegais', require('./routes/criteriosLegais'));
app.use('/normas', require('./routes/normas'));

app.use('/legacy', require('./routes/legacy'));

app.listen(8080, function() {
  console.log('server up! listening on 8080...');
});
