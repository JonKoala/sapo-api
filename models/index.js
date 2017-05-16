var pilar = require('./pilar')
var indicador = require('./indicador')
var tipo = require('./tipo')
var nivel = require('./nivel')
var subnivel = require('./subnivel')

pilar.belongsTo(indicador, {foreignKey: 'indicador_id'});
indicador.hasMany(pilar, {foreignKey: 'indicador_id', as: 'pilares'});

tipo.belongsTo(pilar, {foreignKey: 'pilar_id'});
pilar.hasMany(tipo, {foreignKey: 'pilar_id', as: 'tipos'});

nivel.belongsTo(tipo, {foreignKey: 'tipo_id'});
tipo.hasMany(nivel, {foreignKey: 'tipo_id', as: 'niveis'});

subnivel.belongsTo(nivel, {foreignKey: 'nivel_id'});
nivel.hasMany(subnivel, {foreignKey: 'nivel_id', as: 'subniveis'});

module.exports.pilar = pilar;
module.exports.indicador = indicador;
module.exports.tipo = tipo;
module.exports.nivel = nivel;
module.exports.subnivel = subnivel;
