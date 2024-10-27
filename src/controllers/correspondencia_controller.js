const Correspondencia = require('../models/correspondencia');
const correspondenciaController = {
    guardar: async (req, res) => {
        try {
            const body  = req.body;
            // Usar await para esperar a que Correspondencia.crear retorne el resultado
            const data = await Correspondencia.crear(body);

            res.json({
                status: true,
                data,
                message: 'Correspondencia guardada correctamente',
            }); 
        } catch (err) {
            res.status(500).json({ message: 'Error al guardar la correspondencia', error: err });
        }
    },
    guardarDerivacionHojaDeRuta: async (req, res) => {
        try {
            const body  = req.body;
            console.log("=================");
            console.log("=================1");
            const dataDerivacion = await Correspondencia.crearHistorialDerivacion(body);
            console.log("=================2");
            
            const data = await Correspondencia.guardarHojaDeRuta(body);

            console.log(data);
            
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivacion guardada correctamente en el historial',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al guardar la correspondencia', error: err });
        }
    },

    obtener: async (req, res) => {
        const usu_cre = req.params.usuario;
        try {
            const data = await Correspondencia.obtener(usu_cre);
            res.json(
                {
                status: true,
                data,
                message: 'Correspondencias obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las correspondencias', error: err });
        }
    }  ,


    sabeDoc: async (req, res) => {
        try {
            const body  = req.body;
          
            const data = await Correspondencia.sabeDoc(body);
            res.json({
                status: true,
                data,
                message: 'Correspondencia guardada correctamente',
            }); 
        } catch (err) {
        } 
    } ,
    obtenerTodo: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.obtenerTodo(body);
            res.json(
                {
                status: true,
                data,
                message: 'Correspondencias obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las correspondencias', error: err });
        }
    },
    obtenerUnaCorrespondencia: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.obtenerUnaCorrespondencia(body);
            res.json(
                {
                status: true,
                data,
                message: 'Correspondencias obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las correspondencias', error: err });
        }   
    },
    obtenerPersonas: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.obtenerPersonas(body);
            res.json(
                {
                status: true,
                data,
                message: 'Correspondencias obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las correspondencias', error: err });
        }
    },
  

    obtenerDoc: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.obtenerDoc(body.id_hoja_de_ruta);
            res.json(
                {
                status: true,
                data,
                message: 'Correspondencias obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las correspondencias', error: err });
        }
    },

    // derivaciones
    crearDerivacion: async (req, res) => {
        try {
            const body  = req.body;
            // const data = await Correspondencia.crearDerivacion(body);
            const actualizar =  await Correspondencia.guardarHojaDeRuta(body);
            
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivacion guardada correctamente en el historial',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al guardar la correspondencia', error: err });
        }
    },
    editarDerivacion: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.editarDerivacion(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivacion editada correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al editar la derivacion', error: err });
        }   
    },
    concluidoGamea: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.concluidoGamea(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivacion concluida correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al editar la derivacion', error: err });
        }
        
    },
    aceptarDerivacion: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.aceptarDerivacion(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivacion aceptada correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al aceptar la derivacion', error: err });
        }
    },
    rechazarDerivacion: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.rechazarDerivacion(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivacion rechazada correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al rechazar la derivacion', error: err });
        }
        
    },
    concluirDerivacion: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.concluirDerivacion(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivacion concluida correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al rechazar la derivacion', error: err });
        }
    },
    consultarDerivaciones: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.consultarDerivaciones(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivaciones obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las derivaciones', error: err });
        }
        
    },
    obtenerTodaLaHistorialDeDerivaciones: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.obtenerTodaLaHistorialDeDerivaciones(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivaciones obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las derivaciones', error: err });
        }
    },
    buscarPersona: async (req, res) => {
        
        try {
            const body  = req.body;
            const data = await Correspondencia.buscarPersona(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Persona encontrada correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al buscar la persona', error: err });
        }
    },
    obtenerHistorialDeDerivaciones: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.obtenerHistorialDeDerivaciones(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivaciones obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las derivaciones', error: err });
        }
    },  
    obtenerHistorialData: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.obtenerHistorialData(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivaciones obtenidas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las derivaciones', error: err });
        }
    },



}

module.exports = correspondenciaController;