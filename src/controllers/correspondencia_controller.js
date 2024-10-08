const Correspondencia = require('../models/correspondencia');
const correspondenciaController = {

    guardar: (req, res) => {
        const {referencia, ...data} = req.body;

        Correspondencia.crear(data, (err, result) => {
            if (err) {
                return res.status(500).json({ 
                    status: false,
                    message: 'Error en el servidor',
                    data:  null
                });
            }
            return res.status(200).json(
                { 
                    status: true,
                    msg: 'Guardado exitoso', 
                    data: result 
                }
            );
        });
       
    }
}

module.exports = correspondenciaController;