const BaseModel = require('./baseModel')

class Indicador extends BaseModel {

  getAll() {
    return this.execQuery('SELECT * FROM Indicador');
  }

}

module.exports = () => { return new Indicador(); };
