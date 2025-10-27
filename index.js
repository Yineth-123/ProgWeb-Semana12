// Importar Express
const express = require('express');
const app = express();

// Middleware para interpretar JSON en el body
app.use(express.json());

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Hello World desde Express');
});

// Base de datos temporal (en memoria)
let tasks = [];
let nextId = 1;

/**
 * 📌 POST /tasks - Crear una nueva tarea
 * Body esperado: { "title": "...", "description": "..." }
 */
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    status: 'PENDING'
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * 📌 GET /tasks - Listar todas las tareas
 */
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

/**
 * 📌 GET /tasks/:id - Obtener una tarea por su ID
 */
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

/**
 * 📌 PUT /tasks/:id - Actualizar una tarea
 * Body opcional: { "title": "...", "description": "...", "status": "PENDING|DONE" }
 */
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { title, description, status } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status.toUpperCase();

  res.json(task);
});

/**
 * 📌 DELETE /tasks/:id - Eliminar una tarea
 */
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const lengthBefore = tasks.length;
  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === lengthBefore) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json({ message: 'Task deleted successfully' });
});

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
