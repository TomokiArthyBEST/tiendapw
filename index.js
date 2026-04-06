const mysql = require('mysql2');

// 1. Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Déjalo vacío si no usas contraseña en Workbench
  database: 'tiendapw'
});

// 2. Conectar e insertar
connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión: ' + err.message);
    return;
  }
  console.log('✅ ¡Éxito! Conectado a la base de datos tiendapw.');

  // 3. Insertar un proveedor de prueba
  const sqlInsert = "INSERT INTO PROVEEDORES (NIF, NOMBRE, DIRECCION) VALUES ('A100', 'Tecno-Market', 'Av. Siempreviva 742')";

  connection.query(sqlInsert, (err, result) => {
    if (err) {
      // Si el NIF ya existe, nos dará un error, lo controlamos aquí:
      console.log("⚠️ Nota: El proveedor ya existe o hubo un problema.");
    } else {
      console.log("✅ ¡Proveedor guardado con éxito!");
    }

    // 4. Consultar la lista final
    connection.query('SELECT * FROM PROVEEDORES', (err, results) => {
      if (err) throw err;
      console.log('--- LISTA DE PROVEEDORES ---');
      console.table(results); // Esto dibuja una tabla bonita en la terminal
      
      connection.end(); // Cerramos la conexión
    }); // Aquí cierra el query de SELECT
  }); // Aquí cierra el query de INSERT
}); // Aquí cierra el connect