const db = require("./db");

const User = {
  login: (user, password, callback) => {
    const query = `select p.*
    from usuarios u
    inner join personas p 
    on u.id_personas = p.id_personas 
    where u.usuario = ? and u.password = ?`;
    db.query(query,[user,password] ,(err, results) => {
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
