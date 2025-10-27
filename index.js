const express = require('express');
const app = express();
app.use(express.json());

let students = [
{id: 1, name: "alice"},
{id: 2, name: "Bob"},
{id: 3, name: "Charlie"},
{id: 4, name: "Diana"},
{id: 5, name: "Ethan"}
]


//Sample endpoint to get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// Sample endpoint to get a student by ID
app.get("/students/:id", (req, res) => {
    const student = students.find((s)=> s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({message: "Student not found"});
    res.json(student);
});

// Sample endpoint to add a new stundet
app.post ("/students", (req, res)=> {
    const {name} = req.body; //Desestructuración
    if (!name) return res.status(400).json ({message: "Name is required"});
    const newStudent = {
        id: students.length + 1,
        name
    }
    students.push(newStudent);
    res.status(201).json (newStudent) // 201 siempre va a ser la respuesta a una creacion de recurso exitosa (POST)
})


// Update student by ID
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const { name } = req.body;
  student.name = name || student.name;
  res.json(student);
});


// Delete student by ID
app.delete('/students/:id', (req, res) => {
  const initialLength = students.length;
  students = students.filter(s => s.id !== parseInt(req.params.id));

  if (students.length === initialLength) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json({ message: 'Student deleted successfully' });
});

const PORT = 3000;C
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
