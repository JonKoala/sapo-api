var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var auth = require('./auth')
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(auth.initialize());

app.use('/auth', require('./routes/auth'));

app.use('/indicadores', require('./routes/indicadores'));
app.use('/pilares', require('./routes/pilares'));
app.use('/tipos', require('./routes/tipos'));
app.use('/niveis', require('./routes/niveis'));
app.use('/subniveis', require('./routes/subniveis'));
app.use('/itens', require('./routes/itens'));
app.use('/pontuacoes', require('./routes/pontuacoes'));
app.use('/itenscriterioslegais', require('./routes/itensCriteriosLegais'));
app.use('/criterioslegais', require('./routes/criteriosLegais'));
app.use('/normas', require('./routes/normas'));
app.use('/avaliacoes', require('./routes/avaliacoes'));
app.use('/objetosavaliacao', require('./routes/objetosAvaliacao'));
app.use('/notas', require('./routes/notas'));
app.use('/entidades', require('./routes/entidades'));
app.use('/navegadores', require('./routes/navegadores'));
app.use('/usuarios', require('./routes/usuarios'));

var port = process.env['SAPO_API_PORT'];
app.listen(port, function() {
  console.log('Server up! Listening on ' + port + '...');
});
