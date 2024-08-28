const db = require("./db");

const User = {
  login: (user, password, callback) => {
    const query = `
      SELECT 
          id, 
          nombres, 
          apellidos, 
          tipousuarios, 
          ci, 
          edad, 
          \`user\`
      FROM 
          sadm6.usuarios
      WHERE 
          \`user\` = '${user}' AND password = '${password}';
    `;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      return callback(null, results[0]);
    });
    
  },
};

module.exports = User;
