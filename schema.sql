-- Configuracion de la base de datos

CREATE TABLE IF NOT EXISTS post (
	id INT AUTO_INCREMENT PRIMARY KEY, -- configuro un id autoincrementable para cada post
	title VARCHAR(255) NOT NULL,
	content TEXT NOT NULL,
	demon TEXT NOT NULL,
	level INT NOT NULL
);

