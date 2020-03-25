// aplicação express
const express = require('express');
const app = express();

// configurar porta que aplicação express irá ouvir
app.listen(3000);

// configurar aplicação express para ler json na requisição
app.use(express.json());

// criar objeto projects
const projects = [];

// middleware para que o aplicativo seja chamado indepentente da rota
app.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`)

  next();

  console.timeEnd('Request');
})

// rota que retorne todos os projects
app.get('/projects', (req, res) => {
  return res.json(projects);
})
// fim rota retorna todos projetos

// rota para inserir novo projeto
app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
})
// fim rota criar novo projeto

// rota para atualizar title por id
app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);

})
// fim da rota title por id

//rota para inserir tarefa por id
app.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});








