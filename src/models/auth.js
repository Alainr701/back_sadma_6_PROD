const connection = require('./db');

function getUserById(id, callback) {
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      callback(error);
    } else if (results.length === 0) {
      callback(null, null);
    } else {
      callback(null, results[0]);
    }
  });
}
//login
function login(email, password, callback) {
  const query = 'SELECT * FROM usuarios WHERE login = ? AND password = ?';
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      callback(error);
    } else if (results.length === 0) {
      callback(null, null);
    } else {
      callback(null, results[0]);
    }
  });
}

module.exports = {
  getUserById,
  login
};