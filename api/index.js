
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {// sincronizar la conexion entre servidor y base de datos.
  server.listen(3002, () => {
    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});
