const sql = require('mssql/msnodesqlv8')

const pool = new sql.ConnectionPool({
  database: 'SAPO',
  server: 'tcees43',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
});

var indicador = { };
indicador.getAll = function() {
  pool.close();

  return new Promise((resolve, reject) => {
    pool.connect()
      .then(() => {
        return pool.request()
          .query('SELECT * FROM Indicador');
      })
      .then(result => {
        resolve(result.recordset);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = indicador;
