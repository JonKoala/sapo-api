const sql = require('mssql/msnodesqlv8')

class Indicador {

  constructor() {
    this.config = {
      database: 'SAPO',
      server: 'tcees43',
      driver: 'msnodesqlv8',
      options: {
        trustedConnection: true
      }
    };
  }

  execQuery(query) {
    return new Promise((resolve, reject) => {
      sql.connect(this.config).then(pool => {
        return pool.request().query(query);
      }).then(result => {
        resolve(result.recordset);
      }).catch(err => {
        reject(err);
      }).then(() => {
        sql.close();
      });
    });
  }

  getAll() {
    return this.execQuery('SELECT * FROM Indicador');
  }

}

module.exports = () => { return new Indicador(); };
