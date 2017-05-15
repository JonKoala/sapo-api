const sql = require('mssql/msnodesqlv8')

class BaseModel {

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

}

module.exports = BaseModel;
