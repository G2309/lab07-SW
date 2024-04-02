//							Main Lab06
//							Gustavo Cruz	
//							   22779

// Se consulto el siguiente video para la instalacion y documentacion de swagger: https://www.youtube.com/watch?v=RayDPBYou4I&t=349s

const express = require('express')
const pool = require('./conn.js')
const fs = require('fs')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerSpec = require('../swaggerConfig')
const app = express()
const port = process.env.PORT || 3000

// Middleware para permitir CORS
app.use(cors())

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json())

// Middleware para usar swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Middleware para detectar errores en el JSON de las solicitudes
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send('Formato JSON incorrecto en el cuerpo de la solicitud')
  } else {
    next()
  }
})

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene todos los posts.
 *     description: Retorna una lista de todos los posts almacenados en la base de datos.
 *     responses:
 *       200:
 *         description: Éxito al obtener los posts.
 *       500:
 *         description: Error interno del servidor al obtener los posts.
 */

// GET /posts - Función para retornar todos los posts
app.get('/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM post')
    res.status(200).json(rows)
  } catch (error) {
    console.error('Error al obtener posts:', error)
    res.status(500).send('Error al obtener posts')
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Obtiene un post específico por su ID.
 *     description: Retorna un post específico basado en el ID proporcionado en la URL.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post a obtener.
 *     responses:
 *       200:
 *         description: Éxito al obtener el post.
 *       404:
 *         description: Post no fue encontrado.
 *       500:
 *         description: Error al obtener el post.
 */

// GET /posts/:postId - Función para retornar un post específico
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const [rows] = await pool.query('SELECT * FROM post WHERE id = ?', postId)
    if (rows.length === 0) {
      res.status(404).send('Post no encontrado')
    } else {
      res.status(200).json(rows[0])
    }
  } catch (error) {
    console.error('Error al obtener el post:', error)
    res.status(500).send('Error al obtener el post')
  }
})

// POST /posts - Función para crear un nuevo post
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo post.
 *     description: Crea un nuevo post con el título, contenido, demon y nivel proporcionados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del post.
 *               content:
 *                 type: string
 *                 description: Contenido del post.
 *               demon:
 *                 type: string
 *                 description: Demon del post (opcional).
 *               level:
 *                 type: integer
 *                 description: Nivel del post (opcional).
 *     responses:
 *       201:
 *         description: Post creado correctamente.
 *       400:
 *         description: No se proporcionó título o contenido para el post.
 *       500:
 *         description: Error al crear el post.
 */

// POST /posts - Función para crear un nuevo post
app.post('/posts', async (req, res) => {
  const {title, content, demon, level} = req.body
  if (!title || !content) {
    return res.status(400).send('Por favor, proporcione un título y un contenido para el post')
  }
  try {
    const [result] = await pool.query('INSERT INTO post (title, content, demon, level) VALUES (?, ?, ?, ?)', [title, content, demon || '', level || 0])
    res.status(201).json(result)
  } catch (error) {
    console.error('Error al crear el post:', error)
    res.status(500).send('Error al crear el post')
  }
})

// PUT /posts/:postId - Función para modificar un post existente
/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Actualiza un post existente por su ID.
 *     description: Actualiza un post existente con el ID proporcionado en la URL, utilizando los datos proporcionados en el cuerpo de la solicitud.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título del post.
 *               content:
 *                 type: string
 *                 description: Nuevo contenido del post.
 *               demon:
 *                 type: string
 *                 description: Nuevo demon del post (opcional).
 *               level:
 *                 type: integer
 *                 description: Nuevo nivel del post (opcional).
 *     responses:
 *       200:
 *         description: Post actualizado correctamente.
 *       400:
 *         description: No se proporcionó título o contenido para el post.
 *       404:
 *         description: El post no fue encontrado.
 *       500:
 *         description: Error interno del servidor al actualizar el post.
 */

// PUT /posts/:postId - Función para modificar un post existente
app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  const {title, content, demon, level} = req.body
  if (!title || !content) {
    return res.status(400).send('Por favor, proporcione un título y un contenido para el post')
  }
  try {
    const [result] = await pool.query('UPDATE post SET title = ?, content = ?, demon = ?, level = ? WHERE id = ?', [title, content, demon || '', level || 0, postId])
    if (result.affectedRows === 0) {
      return res.status(404).send('Post no encontrado')
    }
    res.status(200).send('Post actualizado correctamente')
  } catch (error) {
    console.error('Error al actualizar el post:', error)
    res.status(500).send('Error al actualizar el post')
  }
})

// DELETE /posts/:postId - Función para borrar un post existente
/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Elimina un post existente por su ID.
 *     description: Elimina un post existente con el ID proporcionado en la URL.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post a eliminar.
 *     responses:
 *       204:
 *         description: Post eliminado correctamente.
 *       404:
 *         description: El post no fue encontrado.
 *       500:
 *         description: Error interno del servidor al eliminar el post.
 */

// DELETE /posts/:postId - Función para borrar un post existente
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const [result] = await pool.query('DELETE FROM post WHERE id = ?', postId)
    if (result.affectedRows === 0) {
      return res.status(404).send('Post no encontrado')
    }
    res.status(204).send()
  } catch (error) {
    console.error('Error al borrar el post:', error)
    res.status(500).send('Error al borrar el post')
  }
})

// Manejador para cualquier otro tipo de solicitud
app.use((req, res) => {
  res.status(501).send('Método HTTP no implementado')
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://127.0.0.1:${port}`)
})

