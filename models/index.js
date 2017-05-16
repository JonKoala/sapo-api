var pilar = require('./pilar')
var indicador = require('./indicador')

pilar.belongsTo(indicador, {foreignKey: 'indicador_id'});
indicador.hasMany(pilar, {foreignKey: 'indicador_id', as: 'pilares'});

module.exports.pilar = pilar;
module.exports.indicador = indicador;
