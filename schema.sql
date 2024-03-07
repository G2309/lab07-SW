# Configuracion de la base de datos

CREATE TABLE post {
	id INT AUTO_INCREMENT PRIMARY KEY, # configuro un id autoincrementable para cada post
	title VARCHAR(255) NOT NULL,
	content TEXT
};

