// 			Blog 	javascript 
// 			Gustavo Cruz 22779

// Imports de los programas necesarios

const express = require('express');
const mysql = require('mysql2/promise');
const blog = express();
const port = process.env.PORT || 3306;

// Conexion a base de datos
const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'gustavo',
	password: 'gus',
	port: 3306,
	database: 'post_db'
});

// Conectar a base de datos, si hay error mostrara un mensaje de error

blog.use(express.json());

// GET /post 		---	Funcion para retornar posts 
blog.get('/posts', (req, res) => {
	db.query('SELECT * FROM post', (err, results) => {
		if(err) {
			console.error('Error al obtener posts: ',err);
			return res.status(500).send('Error en funcion /GET /posts');
		}
		return res.status(200).json(results);
	});
});

// GET /post:ID 	---	Funcion para retornar post con el id
blog.get('/posts/:postId', (req, res) => {
	const postId = req.params.postId;
	db.query('SELECT * FROM post WHERE id = ?', postId, (err, results) => {
		if(err){
			console.error('Error al obtener post:',err);
			return res.status(500).send('Error en funcion /GET /postId');
		}
		if (results.length === 0) {
			return res.status(404).send('Post no encontrado');
		}
		return res.status(200).json(results[0]);
	});
});

// POST /posts		---	Funcion para crear post
blog.post('/posts', (req,res) => {
	const {title, content} = req.body;
	if (!title || !content) {
		return res.status(400).send('Por favor, proporcione un titulo y un parrafo a su post');
	}
	const newPost = {title, content};
	db.query('INSERT INTO post SET ?', newPost, (err,result) => {
		if(err){
			console.error('Error al crear post',err);
			return res.status(500).send('Errror en funcion /Post /posts');
		}
	});
});

// PUT /postID 		--- 	Funcion para modificar post
blog.put('/posts/:postId', (req,res) => {
	const postId = req.params.postId;
	const {title, content} = req.body;
	if (!title || !content) {
		return res.status(400).send('Por favor, proporcione un titulo y contenido para el post');
	}
	const updatedPost = {title,content};
	db.query('UPDATE post SET ? WHERE id = ?', [updatedPost, postId], (err)=> {
		if(err){
			console.error('Error al modificar el post', err);
			return res.status(500).send('Error en funcion /PUT /postId');
		}
		updatedPost.id = postId;
		return res.status(200).json(updatedPost);
	});
});

// DELETE /postID	--- 	Funcion para borrar post
blog.delete('/posts/:postId', (req,res) => {
	const postId = req.params.postId;
	db.query('DELETE FROM post WHERE id = ?', postId, (err) => {
		if(err){
			console.error('Error al borrar el post:',err);
		return res.status(500).send('Error en funcion /Delete /postId');
		}
		return res.status(204).send();
	});
});

// Conexion al servidor
//connectToDatabase();

// Funcion para manejar cualquier otro tipo de error
blog.use((req,res) => {
	res.status(501).send('Metodo HTTP no implementado');
});

// Inicio del servidor
blog.listen(port, () => {
	console.log('Servidor Express corriendo en http://localhost:${port}');
});
