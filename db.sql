CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  tipousuarios VARCHAR(255) NOT NULL,
  ci VARCHAR(255) NOT NULL,
  edad INT NOT NULL,
  user VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
-- llenar
INSERT INTO usuarios (nombres, apellidos, tipousuarios, ci, edad, user, password) VALUES ('Juan', 'Cortes', 'Administrador', '1234567', 35, 'admin', 'admin');