// controllers/auth.js
const User = require('../models/auth');

const authController = {
  login: (req, res) => {
    const { usuario, password } = req.body;
    
    User.login(usuario,password, (err, user) => {
      if (err) return res.status(500).json({ 
        status: false,
        message: 'Error en el servidor',
        data:  null
      });
      if (!user) return res.status(401).json({ 
        status: false,
        message: 'Usuario no encontrado' ,
        data:  null
      });
      return res.status(200).json(
        { 
          status: true,
          msg: 'Login exitoso', 
          data: user 
        }
      );
    });
  }
};
module.exports = authController;
