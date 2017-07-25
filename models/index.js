var pilar = require('./pilar')
var indicador = require('./indicador')
var tipo = require('./tipo')
var nivel = require('./nivel')
var subnivel = require('./subnivel')
var item = require('./item')
var pontuacao = require('./pontuacao')
var criterioLegal = require('./criterioLegal')
var itemCriterioLegal = require('./itemCriterioLegal')
var norma = require('./norma')
var avaliacao = require('./avaliacao')
var objetoAvaliacao = require('./objetoAvaliacao')
var entidade = require('./entidade')
var nota = require('./nota')
var navegador = require('./navegador')
var usuario = require('./usuario')
var perfil = require('./perfil')
var utils = require('./utils')

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

//indicador 1:n avaliacoes
avaliacao.belongsTo(indicador, {foreignKey: 'indicador_id'});
indicador.hasMany(avaliacao, {foreignKey: 'indicador_id', as: 'avaliacoes'});

//avaliacao 1:n objetoAvaliacao
objetoAvaliacao.belongsTo(avaliacao, {foreignKey: 'avaliacao_id'});
avaliacao.hasMany(objetoAvaliacao, {foreignKey: 'avaliacao_id', as: 'objetosAvaliacao'});

//entidade 1:n objetoAvaliacao
objetoAvaliacao.belongsTo(entidade, {foreignKey: 'entidade_id'});
entidade.hasMany(objetoAvaliacao, {foreignKey: 'entidade_id', as: 'objetosAvaliacao'});

//objetoAvaliacao 1:n nota
nota.belongsTo(objetoAvaliacao, {foreignKey: 'objeto_avaliacao_id'});
objetoAvaliacao.hasMany(nota, {foreignKey: 'objeto_avaliacao_id', as: 'notas'});

//item 1:n nota
nota.belongsTo(item, {foreignKey: 'item_id'});
item.hasMany(nota, {foreignKey: 'item_id', as: 'notas'});

//pontuacao 0-1:n nota
nota.belongsTo(pontuacao, {foreignKey: 'pontuacao_id'});
pontuacao.hasMany(nota, {foreignKey: 'pontuacao_id', as: 'notas'});

//navegador 0-1:n nota
nota.belongsTo(navegador, {foreignKey: 'navegador_id'});
navegador.hasMany(nota, {foreignKey: 'navegador_id', as: 'notas'});

//navegador 1:n Usuario
usuario.belongsTo(navegador, {foreignKey: 'navegador_id'});
navegador.hasMany(usuario, {foreignKey: 'navegador_id', as: 'usuarios'});

//usuario 1:n nota
nota.belongsTo(usuario, {foreignKey: 'usuario_id'});
usuario.hasMany(nota, {foreignKey: 'usuario_id', as: 'notas'});

//perfil 1:n usuario
usuario.belongsTo(perfil, {foreignKey: 'perfil_id'});
perfil.hasMany(usuario, {foreignKey: 'perfil_id', as: 'usuarios'});

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
module.exports.avaliacao = avaliacao;
module.exports.objetoAvaliacao = objetoAvaliacao;
module.exports.entidade = entidade;
module.exports.nota = nota;
module.exports.navegador = navegador;
module.exports.usuario = usuario;
module.exports.perfil = perfil;
module.exports.utils = utils;
