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
    // console.log("Ejecutando correspondencia.crear con los siguientes datos:",
    //     data
    // );
    // console.error("''''''''''''''''''':");
    // console.log(
    //     // `SADM6-${indice}-${new Date().getFullYear()}`,
    //     data.cite,
    //     data.referencia,
    //     data.observacion,
    //     data.descripcion,
    //     data.tipo,
    //     data.categoria,
    //     data.estado, 
    //     data.fec_mod,
    //     data.usu_cre,
    //     data.usu_mod, 
    //     data.id_documentos,
    //     data.id_personas,
    //     data.id_documentos,
    //     data.id_personas
    // );
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
             id_documentos,
             id_personas
             )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
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
                    data.id_personas,
                    data.id_documentos,
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
    
        console.log("Resultado de la inserción:", result); // Muestra el resultado de la inserción
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
    }  
    return indice; // Retorna el nuevo índice
  },
  //PARA OBTENER  EN UNA LISTA
  //SELECT id_hoja_de_ruta, codigo_interno, cite, referencia, observacion, descripcion, tipoDocumento, categoria, estado, fec_cre, fec_mod, usu_cre, usu_mod, id_documentos, id_personas FROM sadm6.hoja_de_ruta;

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
