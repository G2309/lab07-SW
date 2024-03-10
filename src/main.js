const express = require('express');
const pool = require('./conn.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// GET /posts - Función para retornar todos los posts
app.get('/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM post');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    res.status(500).send('Error al obtener posts');
  }
});

// GET /posts/:postId - Función para retornar un post específico
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const [rows] = await pool.query('SELECT * FROM post WHERE id = ?', postId);
    if (rows.length === 0) {
      res.status(404).send('Post no encontrado');
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Error al obtener el post:', error);
    res.status(500).send('Error al obtener el post');
  }
});

// POST /posts - Función para crear un nuevo post
app.post('/posts', async (req, res) => {
  const { title, content, demon, level } = req.body;
  if (!title || !content) {
    return res.status(400).send('Por favor, proporcione un título y un contenido para el post');
  }
  try {
    const [result] = await pool.query('INSERT INTO post (title, content, demon, level) VALUES (?, ?, ?, ?)', [title, content, demon || '', level || 0]);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).send('Error al crear el post');
  }
});

// PUT /posts/:postId - Función para modificar un post existente
app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const { title, content, demon, level } = req.body;
  if (!title || !content) {
    return res.status(400).send('Por favor, proporcione un título y un contenido para el post');
  }
  try {
    const [result] = await pool.query('UPDATE post SET title = ?, content = ?, demon = ?, level = ? WHERE id = ?', [title, content, demon || '', level || 0, postId]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Post no encontrado');
    }
    res.status(200).send('Post actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    res.status(500).send('Error al actualizar el post');
  }
});

// DELETE /posts/:postId - Función para borrar un post existente
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const [result] = await pool.query('DELETE FROM post WHERE id = ?', postId);
    if (result.affectedRows === 0) {
      return res.status(404).send('Post no encontrado');
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al borrar el post:', error);
    res.status(500).send('Error al borrar el post');
  }
});

// Manejador para cualquier otro tipo de solicitud
app.use((req, res) => {
  res.status(501).send('Método HTTP no implementado');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://127.0.0.1:${port}`);
});

