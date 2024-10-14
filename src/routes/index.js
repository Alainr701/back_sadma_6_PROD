const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth_controller');
const correspondenciaController = require('../controllers/correspondencia_controller.JS');

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
router.post('/correspondencias_guardar', correspondenciaController.guardar);
router.get('/correspondencias_obtener/:usuario', correspondenciaController.obtener);
//SABE DOCUEMENS

router.post('/correspondencias_sabeDoc', correspondenciaController.sabeDoc);

//login
router.post('/login', authController.login);

module.exports = router;
