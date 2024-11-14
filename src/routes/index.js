const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth_controller');
const newLocal = '../controllers/correspondencia_controller.js';
const correspondenciaController = require(newLocal);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

//auth
router.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  auth.getUserById(id, (error, user) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving user' ,status: false});
    } else if (!user) {
      res.status(404).json({ error: 'User not found',status: false });
    } else {
      res.json({user, status: true});
    }
  });
});
//CORRRESPONDENCIA
router.post('/obtenerCorrespondencia', correspondenciaController.obtenerTodo);
router.post('/obtenerUnaCorrespondencia', correspondenciaController.obtenerUnaCorrespondencia);
router.post('/correspondencias_guardar', correspondenciaController.guardar);
router.post('/guardarDerivacionHojaDeRuta', correspondenciaController.guardarDerivacionHojaDeRuta);
router.get('/correspondencias_obtener/:usuario', correspondenciaController.obtener);
//SABE DOCUEMENS

router.post('/correspondencias_sabeDoc', correspondenciaController.sabeDoc);
router.post('/obtenerDoc', correspondenciaController.obtenerDoc);

//login
router.post('/login', authController.login);


//personas
router.get('/obtenerPersonasUnidad', correspondenciaController.obtenerPersonas);

//derivaciones
router.post('/crearDerivacion', correspondenciaController.crearDerivacion);
router.post('/editarDerivacion', correspondenciaController.editarDerivacion);
router.post('/aceptarDerivacion', correspondenciaController.aceptarDerivacion);
router.post('/rechazarDerivacion', correspondenciaController.rechazarDerivacion);
router.post('/concluidoGamea', correspondenciaController.concluidoGamea);
router.post('/concluirDerivacion', correspondenciaController.concluirDerivacion);

router.post('/obtenerHistorialDeDerivaciones', correspondenciaController.obtenerHistorialDeDerivaciones);

router.post('/obtenerHistorialData', correspondenciaController.obtenerHistorialData);

router.post('/obternerCodigoInterno', correspondenciaController.obternerCodigoInterno);


//obetener datos

router.get('/obtenerRoles', correspondenciaController.obtenerRoles);
router.get('/obtenerCargos', correspondenciaController.obtenerCargos);
router.get('/obtenerUnidades', correspondenciaController.obtenerUnidades);

//CREADO   //
//DERIVADO
//ACEPTADO
//ACEPTADO_DES
//REMITIDO
//REMITIDO_DES 
//CONCLUIDO
//FINALIZADO //


// obtenerTodaLaHistorialDeDerivaciones
router.post('/getHistorial', correspondenciaController.obtenerTodaLaHistorialDeDerivaciones);

router.post('/buscarPersona', correspondenciaController.buscarPersona);

router.post('/agregarPersonas', correspondenciaController.agregarPersona);

router.post('/agregarUsuarios', correspondenciaController.agregarUsuarios);
router.get('/consultarPersonas', correspondenciaController.consultarPersonas);


module.exports = router;
