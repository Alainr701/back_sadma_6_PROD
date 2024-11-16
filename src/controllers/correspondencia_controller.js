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
    
    aceptarDerivacionHistorial: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.aceptarDerivacionHistorial(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Derivacion aceptada correctamente en el historial',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al aceptar la derivacion en el historial', error: err });
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
            console.log(body);
            
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
    obternerCodigoInterno: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.obternerCodigoInterno(body);
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
    // select id_roles,nombre from sadm6.roles r;
// select id_cargos,nombre from sadm6.cargos u;
// select id_unidad,nombre from sadm6.unidad u ;
    obtenerRoles: async (req, res) => {
        try {
            const data = await Correspondencia.obtenerRoles();
            res.json(
                {
                    status: true,
                    data,
                    message: 'Roles obtenidos correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener los roles', error: err });
        }
    },
    obtenerCargos: async (req, res) => {
        try {
            const data = await Correspondencia.obtenerCargos();
            res.json(
                {
                    status: true,
                    data,
                    message: 'Cargos obtenidos correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener los cargos', error: err });
        }
    },
    obtenerUnidades: async (req, res) => {
        try {
            const data = await Correspondencia.obtenerUnidades();
            res.json(
                {
                    status: true,
                    data,
                    message: 'Unidades obtenidos correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener las unidades', error: err });
        }
    },
    obtenerCargos: async (req, res) => {
        try {
            const data = await Correspondencia.obtenerCargos();
            res.json(
                {
                    status: true,
                    data,
                    message: 'Cargos obtenidos correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener los cargos', error: err });
        }
    },
    //personas
    agregarPersona: async (req,res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.agregarPersona(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Persona agregada correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al agregar la persona', error: err });
        }
        
    },
    agregarUsuarios: async (req,res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.agregarUsuarios(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Usuario agregado correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al agregar el usuario', error: err });
        }
        
    },
    consultarPersonas: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.consultarPersonas();
            res.json(
                {
                    status: true,
                    data,
                    message: 'Personas consultadas correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al consultar las personas', error: err });
        }
    },
    actualizarEstadoUsuario: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.actualizarEstadoUsuario(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Persona actualizada correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al actualizar la persona', error: err });
        }
    },
    actualizarPersona: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.actualizarPersona(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Persona actualizada correctamente',
                });
                
        } catch (err) {
            res.status(500).json({ message: 'Error al actualizar la persona', error: err });
        }
    },
    actualizarUsuarios: async (req, res) => {
        try {
            const body  = req.body;
            const data = await Correspondencia.actualizarUsuarios(body);
            res.json(
                {
                    status: true,
                    data,
                    message: 'Usuario actualizado correctamente',
                });
        } catch (err) {
            res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
        }
    },
    
}

module.exports = correspondenciaController;