const db =require("./db");  

const Correspondencia = {
    crear: (data, callback) => {

        const indice = 0;
        const ultimoIdQuery = `
       SELECT MAX(id_hoja_de_ruta) AS ultimo_id
       FROM hoja_de_ruta;`;
        
        db.query(ultimoIdQuery, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result[0].ultimo_id??0);
                indice=  result[0].ultimo_id??0| + 1;
                console.log("xxxxindice: ", indice);
                // callback(null, indice);
            }
        });
        console.log("indice: ", indice); //this will print 0, because the callback is asynchronous
        

        const query = `
        INSERT INTO hoja_de_ruta
        (
        codigo_interno,
        cite,
        referencia,
        observacion,
        descripcion,
        tipo,
        caracter,
        fecha_ingreso,
        estado,
        fec_cre,
        fec_mod,
        usu_cre,
        usu_mod,
        id_documentos
        ) 
        VALUES
        (?,?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?)
        `;
//         referencia: string;
//   descripcion: string;
//   observacion: string;
//   cite: string;
//   nombreRemitente: string;
//   cargoRemitente: string;
//   dependencia: string;
//   contacto: string;
//   categoria: string; 
//   documento: string;
//   tipoDocumento?: string;   
       
        db.query(query, [
            `SADM6-${indice}-${new Date().getFullYear()}`,
            data.cite,
            data.referencia,
            data.observacion,
            data.descripcion,
            data.tipo,
            data.caracter,
            data.fec_cre,
            data.usu_cre,
            data.id_documentos,
            data.id_personas
        ], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        });
      
    },
}

module.exports = Correspondencia;
