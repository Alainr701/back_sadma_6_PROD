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

  obtenerTodo: async (body) => {
    try {
      const sql = `select * from hoja_de_ruta where id_personas = ${body.id_personas} and estado = '${body.estado}' order by id_hoja_de_ruta desc`;
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
      return null;
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
  // select * from personas p
  obtenerPersonas: async () => {
    try {
      const sql = `select *,u.nombre from personas p
      inner join unidad u 
      on p.id_personas = u.id_unidad;`;
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
    //optener documento por id 
    // SELECT id, id_hoja_de_ruta, doc64, tipo_documento, fec_cre
// FROM sadm6.documentos;
  obtenerDoc: async (id) => {
    try {
      const sql = `select * from documentos where id_hoja_de_ruta = ${id} order by id desc limit 1`;
      const result = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(result);
        });
      });
      return result[0];
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
    }
      
  },
  //DERIVACIONES
  crearDerivacion: async (data) => {
    const sql=`INSERT INTO sadm6.historial_derivaciones
              (id_personas, id_hoja_de_ruta, fecha_derivacion, obs, fec_cre, plazo_dias,  proveido,estado,id_proveido_personas )
              VALUES(${data.id_personas}, ${data.id_hoja_de_ruta}, current_timestamp(), '${data.observacion}', current_timestamp(), ${data.plazo_dias}, '${data.proveido}', '${data.estado}', ${data.id_proveido_personas});`;
 
    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
    return result['insertId'];
  },
  guardarDerivacionHojaDeRuta: async (data) => {
    
    const sql2=`
    UPDATE sadm6.hoja_de_ruta
    SET 
      estado = '${data.estado}',
      id_personas = ${data.id_personas},
      fec_mod = current_timestamp(),
      id_proveido_personas = ${data.id_proveido_personas},
      usu_mod = '${data.usu_mod}'
      WHERE id_hoja_de_ruta = ${data.id_hoja_de_ruta}; 
      `;
      // usu_mod = ${data.usu_mod}
    const result2 = await new Promise((resolve, reject) => {
      db.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
    return result2;
  }  
  
};



module.exports = Correspondencia;

// let indice = 0;
// const ultimoIdQuery = `
// SELECT MAX(id_hoja_de_ruta) AS ultimo_id
// FROM hoja_de_ruta;`;

// db.query(ultimoIdQuery, (err, result) => {
//     if (err) {
//         console.log(err);
//     } el
//         console.log(result[0].ultimo_id??0);
//         indice = parseInt(result[0].ultimo_id) + 1;
//     }
// });
// console.log("indice: ", indice); //this will print 0, because the callback is asynchronous

// // const query = `
