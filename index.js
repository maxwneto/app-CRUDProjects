// aplicação express
const express = require('express');
const app = express();

// configurar porta que aplicação express irá ouvir
app.listen(3000);

// configurar aplicação express para ler json na requisição
app.use(express.json());

// criar objeto projects
const projects = [];

// middleware para validar id do projeto
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}
// fim do middleware valida id projeto

// middlewate para contar e retornar nº de requisições
function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}
// fim do middleware contagem de requisições

// chamada do middleware para imprimir log
app.use(logRequests);

// rota que retorne todos os projetos
app.get('/projects', (req, res) => {
  return res.json(projects);
});
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
});
// fim rota inserir novo projeto

// rota para atualizar title por id
app.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);

})
// fim da rota atualizar title por id

//rota para inserir tarefa por id
app.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});
// fim da rota para excluir tarefa for id

//rota para excluir usuario por id
app.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});
// fim da rota para excluir projeto por id