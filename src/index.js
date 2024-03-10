const pool = require('./conn') // Ruta al archivo conn.js

async function testConnection() {
  try {
    // Ejecutar una consulta de prueba
    const [rows, fields] = await pool.query('SHOW TABLES')
    console.log('Conexión exitosa a la base de datos')
    console.log('Datos recuperados:', rows)
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
  } finally {
    // Cerrar la conexión al terminar
    pool.end()
  }
}

testConnection()

