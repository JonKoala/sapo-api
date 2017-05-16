var pilar = require('./pilar')
var indicador = require('./indicador')
var tipo = require('./tipo')
var nivel = require('./nivel')
var subnivel = require('./subnivel')
var item = require('./item')
var pontuacao = require('./pontuacao')
var criterioLegal = require('./criterioLegal')
var itemCriterioLegal = require('./itemCriterioLegal')
var norma = require('./norma');

//indicador 1:n pilar
pilar.belongsTo(indicador, {foreignKey: 'indicador_id'});
indicador.hasMany(pilar, {foreignKey: 'indicador_id', as: 'pilares'});

//pilar 1:n tipo
tipo.belongsTo(pilar, {foreignKey: 'pilar_id'});
pilar.hasMany(tipo, {foreignKey: 'pilar_id', as: 'tipos'});

//tipo 1:n nivel
nivel.belongsTo(tipo, {foreignKey: 'tipo_id'});
tipo.hasMany(nivel, {foreignKey: 'tipo_id', as: 'niveis'});

//nivel 1:n subnivel
subnivel.belongsTo(nivel, {foreignKey: 'nivel_id'});
nivel.hasMany(subnivel, {foreignKey: 'nivel_id', as: 'subniveis'});

//subnivel 1:n item
item.belongsTo(subnivel, {foreignKey: 'subnivel_id'});
subnivel.hasMany(item, {foreignKey: 'subnivel_id', as: 'itens'});

//item 1:n pontuacao
pontuacao.belongsTo(item, {foreignKey: 'item_id'});
item.hasMany(pontuacao, {foreignKey: 'item_id', as: 'pontuacoes'});

//item n:m criterioLegal
criterioLegal.belongsToMany(item, {foreignKey: 'criterio_legal_id', through: 'itemCriterioLegal', as: 'itens'});
item.belongsToMany(criterioLegal, {foreignKey: 'item_id', through: 'itemCriterioLegal', as: 'criteriosLegais'});

//norma 1:n criterioLegal
criterioLegal.belongsTo(norma, {foreignKey: 'norma_id'});
norma.hasMany(criterioLegal, {foreignKey: 'norma_id', as: 'criteriosLegais'});

module.exports.pilar = pilar;
module.exports.indicador = indicador;
module.exports.tipo = tipo;
module.exports.nivel = nivel;
module.exports.subnivel = subnivel;
module.exports.item = item;
module.exports.pontuacao = pontuacao;
module.exports.criterioLegal = criterioLegal;
module.exports.itemCriterioLegal = itemCriterioLegal;
module.exports.norma = norma;
