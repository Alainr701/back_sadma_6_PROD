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
    }   

}

module.exports = correspondenciaController;