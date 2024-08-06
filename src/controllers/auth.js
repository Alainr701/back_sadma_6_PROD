// controllers/auth.js

const connection = require('../models/db');

exports.checkUser = (req, res) => {
  const { email } = req.body;

  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al ejecutar consulta:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.json({ exists: false });
    }

    const user = results[0];

    res.json({
      exists: true,
      nombre: user.nombre,
      apellido: user.apellido,
      ci: user.ci,
      edad: user.edad
    });
  });
};