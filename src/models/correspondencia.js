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
    console.log("Indice generado:", indice);
    
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
    const sql = `
      SELECT 
        hr.*,
        hd.id_historial_derivaciones, 
        hd.id_personas AS hd_id_personas,
        hd.fecha_derivacion, 
        hd.obs, 
        hd.fec_cre AS hd_fec_cre, 
        hd.plazo_dias, 
        hd.proveido, 
        hd.estado AS hd_estado, 
        hd.id_proveido_personas AS hd_id_proveido_personas
      FROM hoja_de_ruta hr
      INNER JOIN (
          SELECT *
          FROM historial_derivaciones
          WHERE (id_hoja_de_ruta, fecha_derivacion) IN (
              SELECT id_hoja_de_ruta, MAX(fecha_derivacion)
              FROM historial_derivaciones
              GROUP BY id_hoja_de_ruta
          )
      ) AS hd ON hr.id_hoja_de_ruta = hd.id_hoja_de_ruta
      WHERE 
      hr.id_personas = ${body.id_personas} 
      AND (hr.estado = '${body.estado}' OR hr.estado = '${body.estado2}')
      ORDER BY hr.id_hoja_de_ruta DESC;
    `;

    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });

    // Procesar resultado para anidar historial_derivaciones
    const formattedResult = result.map(row => ({
      id_hoja_de_ruta: row.id_hoja_de_ruta,
      codigo_interno: row.codigo_interno,
      cite: row.cite,
      referencia: row.referencia,
      observacion: row.observacion,
      descripcion: row.descripcion,
      tipoDocumento: row.tipoDocumento,
      categoria: row.categoria,
      estado: row.estado,
      fec_cre: row.fec_cre,
      fec_mod: row.fec_mod,
      usu_cre: row.usu_cre,
      usu_mod: row.usu_mod,
      id_personas: row.id_personas,
      id_proveido_personas: row.id_proveido_personas,
      historial: {
        id_historial_derivaciones: row.id_historial_derivaciones,
        id_personas: row.hd_id_personas,
        id_hoja_de_ruta: row.id_hoja_de_ruta,
        fecha_derivacion: row.fecha_derivacion,
        obs: row.obs,
        fec_cre: row.hd_fec_cre,
        plazo_dias: row.plazo_dias,
        proveido: row.proveido,
        estado: row.hd_estado,
        id_proveido_personas: row.hd_id_proveido_personas
      }
    }));

    return formattedResult;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    return null;
  }
},
obtenerUnaCorrespondencia: async (data) => {
  console.log(data);
  
  try {
    const sql = `SELECT 
    p.*,hr.*,c.nombre,u.nombre as unidad
    FROM hoja_de_ruta hr
    inner join personas p
    ON p.id_personas = hr.id_personas
    INNER join cargos c
    on c.id_cargos = p.id_cargos
    inner join unidad u
    on u.id_unidad = p.id_unidad
    WHERE codigo_interno ='${data.codigo_interno}';`;
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
sabeDoc:  async (data) => {
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
  crearHistorialDerivacion: async (data) => {
    const sql=`INSERT INTO sadm6.historial_derivaciones
              (id_personas, id_hoja_de_ruta, fecha_derivacion, obs, fec_cre, plazo_dias,  proveido,estado,id_proveido_personas, id_documento_save )
              VALUES(${data.id_personas}, ${data.id_hoja_de_ruta}, current_timestamp(), '${data.observacion}', current_timestamp(), ${data.plazo_dias}, '${data.proveido}', '${data.estado}', ${data.id_proveido_personas}, ${data.id_documento_save});`;
    
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
  editarDerivacion: async (data) => {
    const sql = `INSERT INTO sadm6.historial_derivaciones
              (id_personas, id_hoja_de_ruta, fecha_derivacion, obs, fec_cre, plazo_dias,  proveido,estado, id_proveido_personas,
              id_documento_save 
               )
              VALUE(${data.id_personas}, ${data.id_hoja_de_ruta}, current_timestamp(), '${data.observacion}', current_timestamp(), ${data.plazo_dias}, '${data.proveido}', '${data.estado}', ${data.id_proveido_personas}, ${data.id_documento_save});
    `;
    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
    console.log("--------");
    console.log(data.id_personas);
    console.log("--------");
    
    //actualizar hoja de ruta
    const sql2 = `UPDATE sadm6.hoja_de_ruta
    SET 
      estado = '${data.estado}',
      id_personas = ${data.id_personas},
      fec_mod = current_timestamp(),
      id_proveido_personas = '${data.id_proveido_personas}',
      usu_mod = '${data.usu_mod}'
    WHERE id_hoja_de_ruta = ${data.id_hoja_de_ruta}; 
    `;
    const result2 = await new Promise((resolve, reject) => {
      db.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });



    return result2['insertId'];
  },
  guardarHojaDeRuta: async (data) => {
    console.log("======");
    const sql2=`
    UPDATE sadm6.hoja_de_ruta
    SET 
      estado = '${data.estado}',
      id_personas = ${data.id_personas},
      fec_mod = current_timestamp(),
      id_proveido_personas = '${data.id_proveido_personas}',
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
  } ,

  aceptarDerivacion: async (data) => {
    const sql=`
    UPDATE sadm6.hoja_de_ruta
    SET 
      estado = '${data.estado}',
      id_personas = ${data.id_personas},
      fec_mod = current_timestamp(),
      id_proveido_personas = '${data.id_proveido_personas}',
      usu_mod = '${data.usu_mod}'
      WHERE id_hoja_de_ruta = ${data.id_hoja_de_ruta}; 
      `;

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
  },
  rechazarDerivacion: async (data) => {
    console.log("222222222222222");
    console.log(data);
    
    const sql=`
    UPDATE sadm6.hoja_de_ruta
    SET 
      estado = '${data.estado}',
      id_personas = ${data.id_personas},
      fec_mod = current_timestamp(),
      id_proveido_personas = '${data.id_proveido_personas}',
      usu_mod = '${data.usu_mod}',
      observacion = '${data.observacion}'
      WHERE id_hoja_de_ruta = ${data.id_hoja_de_ruta}; 
      `;


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
  },
  concluirDerivacion: async (data) => {
    const sql = `
    UPDATE sadm6.historial_derivaciones
    SET 
      estado = 'CONCLUIDO',
      observacion = '${data.observacion}',
      WHERE id_historial_derivaciones = ${data.id_historial_derivaciones}; 
    `;
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
  },
   async obtenerTodaLaHistorialDeDerivaciones(data){
    const sql = `SELECT
    ROW_NUMBER() OVER (ORDER BY h.id_historial_derivaciones ASC) AS numerador,
    p.nombres AS nombre_remitente,
    p.apellidos AS apellido_remitente,
    c.nombre AS cargo_remitente,
    h.fecha_derivacion,
    (SELECT nombres FROM personas WHERE id_personas = 1) AS nombre_destinatario,
    (SELECT apellidos FROM personas WHERE id_personas = 1) AS apellido_destinatario,
    (SELECT cargo.nombre FROM cargos cargo 
     INNER JOIN personas pdest ON pdest.id_cargos = cargo.id_cargos
     WHERE pdest.id_personas = 1) AS cargo_destinatario,
    h.fecha_respuesta,
    h.proveido,
    h.obs 
  FROM 
    historial_derivaciones h
  INNER JOIN 
    personas p ON h.id_personas = p.id_personas
  INNER JOIN 
    cargos c ON p.id_cargos = c.id_cargos
  INNER JOIN 
    hoja_de_ruta hr ON h.id_hoja_de_ruta = hr.id_hoja_de_ruta
  WHERE 
    hr.id_hoja_de_ruta = ${data.id_hoja_de_ruta}
  ORDER BY 
    h.id_historial_derivaciones ASC`;

    
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
   },
  //  SELECT * from personas where id_personas =1 
   async buscarPersona(data){
    const sql = `
    SELECT *, c.nombre as cargo, u.nombre as unidad
      from personas p
      INNER join cargos c
      on p.id_personas = c.id_cargos
      INNER JOIN unidad u
      on u.id_unidad = p.id_unidad
    WHERE p.id_personas =  ${data.id_personas}`;

    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    })
    return result;
   },
//    id_hoja_de_ruta
// estado
// observacion
   async concluidoGamea(data){
    const sql = `UPDATE hoja_de_ruta
    SET 
      estado = '${data.estado}',
      observacion = '${data.observacion}',
      usu_mod = '${data.usu_mod}'
      WHERE id_hoja_de_ruta = ${data.id_hoja_de_ruta}; 
      `;
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
   },
   async aceptarDerivacionHistorial(data){
    const sql = `INSERT INTO historial_derivaciones
            (
             id_personas, 
             id_hoja_de_ruta,
             fecha_respuesta,
             id_documento_save,
             fec_cre,
             estado,
             id_proveido_personas
             )
            VALUES(
             ${data.id_personas},
             ${data.id_hoja_de_ruta},
             current_timestamp(),
             ${data.id_documento_save},
             current_timestamp(),
             '${data.estado}',
             ${data.id_proveido_personas}
             );`;
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
  //  async rechazarDerivacion(data){
  //   const sql = `INSERT INTO historial_derivaciones
  //           (id_personas, id_hoja_de_ruta, fecha_derivacion, obs, fec_cre, plazo_dias,  proveido,estado,id_proveido_personas, id_documento_save )
  //           VALUES(${data.id_personas}, ${data.id_hoja_de_ruta}, current_timestamp(), '${data.observacion}', current_timestamp(), ${data.plazo_dias}, '${data.proveido}', '${data.estado}', ${data.id_proveido_personas}, ${data.id_documento_save});`;
  //   const result = await new Promise((resolve, reject) => {
  //     db.query(sql, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         return reject(err);
  //       }
  //       resolve(result);
  //     });
  //   });
  //   return result['insertId'];
  //  },
   async obtenerHistorialDeDerivaciones(data){
    const sql = `
    SELECT 

      (SELECT COUNT(*) FROM historial_derivaciones WHERE estado='DERIVADO' AND id_personas = ${data.id_personas}) AS derivado,
      (SELECT COUNT(*) FROM historial_derivaciones WHERE estado='REMITIDO' AND id_personas = ${data.id_personas}) AS remitido,
      (SELECT COUNT(*) FROM historial_derivaciones WHERE estado='ACEPTADO' AND id_personas = ${data.id_personas}) AS aceptado,
      (SELECT COUNT(*) FROM historial_derivaciones WHERE estado='DESTIEMPO' AND id_personas = ${data.id_personas}) AS destiempo,
      (SELECT COUNT(*) FROM historial_derivaciones WHERE estado='CONCLUIDO' AND id_personas = ${data.id_personas}) AS concluido,
      (SELECT COUNT(*) FROM historial_derivaciones WHERE estado='CONCLUIDO_GAMEA' AND id_personas = ${data.id_personas}) AS concluido_gamea
    `;

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
   },
  //  SELECT * FROM `historial_derivaciones` WHERE estado='DERIVADO' AND id_personas =1
   async obtenerHistorialData(data){
   
    const sql = `
    SELECT 
      hr.codigo_interno, 
      hr.referencia, 
      hd.fecha_respuesta, 
      hd.id_historial_derivaciones,
      hd.proveido, 
      hd.estado, 
      hd.obs, 
      hr.cite,
      hd.id_documento_save,
      hd.id_personas,
      hd.id_proveido_personas,
      hr.descripcion
    FROM historial_derivaciones  hd
    inner join hoja_de_ruta hr
    on hd.id_hoja_de_ruta = hr.id_hoja_de_ruta
    WHERE hd.estado='${data.estado}' AND hd.id_personas = ${data.id_personas}
    `;

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
   },
   

   obtenerRoles: async () => {
    const sql = `
    select id_roles,nombre from sadm6.roles r;
    `;
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
   }
   ,
   obtenerCargos: async () => {
    const sql = `
    select id_cargos,nombre from sadm6.cargos u;
    `;
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
   },
   obtenerUnidades: async () => {
    const sql = `
    select id_unidad,nombre from sadm6.unidad u ;
    `;
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
   },



agregarPersona:async (params) => {
  try {
    const  sql = `
    INSERT INTO personas (nombres, apellidos, roles, ci, edad, celular, fec_cre, fec_mod, usu_cre, usu_mod, id_roles, id_cargos, id_unidad)
    VALUES (
      '${params.nombres}',
      '${params.apellidos}',
      '${params.roles}',
      '${params.ci}',
      ${params.edad},
      '${params.celular}',
      current_timestamp(),
      current_timestamp(),
      '${params.usu_cre}',
      '${params.usu_mod}',
      ${params.id_roles},
      ${params.id_cargos},
      ${params.id_unidad}
    );
    `;
     const result = await new Promise((resolve,reject)=>{
      db.query(sql,(err,result)=>{
        if(err){
          console.log(err);
          return reject(err);
        }
        
        resolve(result.insertId);
      })
    });
    return result;
  } catch (error) {
    console.log(error);
  }
},

agregarUsuarios: async (params) => {

  try {
    const sql= `
    INSERT INTO sadm6.usuarios (usuario, password, id_personas,estado) VALUES('${params.usuario}', '${params.password}', ${params.id_personas},TRUE);
    `;
    const result = await new Promise((resolve,reject)=>{
      db.query(sql,(err,result)=>{
        if(err){
          console.log(err);
          return reject(err);
        }
        
        resolve(result.insertId);
      })
    });
    return result;


  } catch (error) {
    console.log(error);
  }
},


actualizarPersona:async (params) => {
  console.log(params);
  
  try {
    const sql = `
    UPDATE personas 
    SET 
      nombres = '${params.nombres}',
      apellidos = '${params.apellidos}',
      roles = '${params.roles}',
      ci = '${params.ci}',
      edad = ${params.edad},
      celular = ${params.celular},
      usu_mod = '${params.usu_mod}',
      id_roles = ${params.id_roles},
      id_cargos = ${params.id_cargos},
      id_unidad = ${params.id_unidad}
    WHERE id_personas = ${params.id_personas};
    `;
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
    console.log(error);
  }
},

actualizarUsuarios:async (params) => {
  try {
    const sql = `
    UPDATE usuarios 
    SET 
      usuario = '${params.usuario}',
      password = '${params.password}',
      fec_mod = current_timestamp(),
      usu_mod = '${params.usu_mod}'
    WHERE id_personas = ${params.id_personas};
    `;
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
    console.log(error);
  }
},
obternerCodigoInterno : async (params) => {
  try {
    const sql = `
    select codigo_interno 
    from hoja_de_ruta 
    where id_hoja_de_ruta = ${params.id_hoja_de_ruta};
    `;
    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
    return result[0].codigo_interno;
  } catch (error) {
    console.log(error);
  }
},

consultarPersonas: async () => {
  try {
    const sql = `select 
                  u.estado,u.usuario,
                   p.*
                  from usuarios u  
                  inner join personas p 
                  on p.id_personas = u.id_personas ;
    `;
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
    console.log(error);
  }
},

actualizarEstadoUsuario : async (params) => {
  
  try {
    const sql = `
    UPDATE usuarios
    SET estado = '${params.estado?1:0}'
    WHERE id_personas = ${params.id_personas};
    `;
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
    console.log(error);
  }
},
reporte : async (params) => {
  try {
    const sql = `
    SELECT 
      CONCAT(p.nombres, ' ', p.apellidos) AS nombre_completo,
      hr.codigo_interno,
      hr.estado,
      hd.fec_cre,
      hd.obs,
      hr.cite
    FROM historial_derivaciones hd 
    INNER JOIN hoja_de_ruta hr ON hd.id_hoja_de_ruta = hr.id_hoja_de_ruta
    INNER JOIN personas p ON p.id_personas = hr.id_personas
    WHERE DATE(hd.fec_cre) >= '${params.fecha_inicio}' 
      AND DATE(hd.fec_cre) <= '${params.fecha_fin}'
      AND hd.id_personas = ${params.id_personas};
    `;
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
    console.log(error);
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
//     } el
//         console.log(result[0].ultimo_id??0);
//         indice = parseInt(result[0].ultimo_id) + 1;
//     }
// });
// console.log("indice: ", indice); //this will print 0, because the callback is asynchronous

// // const query = `
