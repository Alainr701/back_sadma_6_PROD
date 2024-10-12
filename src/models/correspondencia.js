const db = require("./db");

const Correspondencia = {
  crear: async (data) => {
    let indice = 0;
    const ultimoIdQuery = `
            SELECT
                COALESCE(MAX(id_hoja_de_ruta), 0) AS "ultimo_id"
            FROM hoja_de_ruta;
        `;
    console.log("Ejecutando consulta para obtener el último ID");

    try {
      const results = await new Promise((resolve, reject) => {
        db.query(ultimoIdQuery, (err, results) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(results);
        });
      });

      indice = results[0].ultimo_id + 1;
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
    }
    try {
        let sql = `INSERT INTO hoja_de_ruta
       (
             codigo_interno,
             cite,
             referencia,
             observacion,
             descripcion,
             tipoDocumento,
             categoria,
             estado,
             usu_cre,
             id_personas
             )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
        const result = await new Promise((resolve, reject) => {
            db.query(
                sql,
                [
                    `SADM6-${indice}-${new Date().getFullYear()}`,
                    data.cite,
                    data.referencia,
                    data.observacion,
                    data.descripcion,
                    data.tipo,
                    data.categoria,
                    data.estado, 
                    data.usu_cre,
                    data.id_personas,
                ],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err); 
                    }
                    resolve(result); 
                }
            );
        });
    
        console.log("Resultado de la inserción:", result); 
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
    }  
    return indice; 
  },
  obtener: async (usu_cre) => {
    try {
      const sql = `select * from hoja_de_ruta where usu_cre = '${usu_cre}'`;
      const result = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(result);
        });
      });
      return result;
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
    }
  },
  crearDoc:  async (data) => {
    try {

        let sql = `INSERT INTO documentos
            (   
             id_hoja_de_ruta,
             doc64,
             tipo_documento,
             fec_cre
             ) 
            VALUES
            (?, ? , ?, current_timestamp()
            )`;
        console.log(data);
        
        const result = await new Promise((resolve, reject) => {
            db.query(
                sql,
                [ 
                    data.id_hoja_de_ruta,
                    data.doc64,
                    data.tipo_documento,
                ],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err); 
                    }
                    resolve(result); 
                }
            );
        });
        return result['insertId'];
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
    }  
    return indice;
  },
};

module.exports = Correspondencia;

// let indice = 0;
// const ultimoIdQuery = `
// SELECT MAX(id_hoja_de_ruta) AS ultimo_id
// FROM hoja_de_ruta;`;

// db.query(ultimoIdQuery, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result[0].ultimo_id??0);
//         indice = parseInt(result[0].ultimo_id) + 1;
//     }
// });
// console.log("indice: ", indice); //this will print 0, because the callback is asynchronous

// // const query = `
