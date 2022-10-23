const express = require('express');
const knex = require('knex')
const cors = require('cors')
var bcrypt = require('bcryptjs');


const db = knex({
  client: 'pg',
   connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'testing',
    database : 'uzdevumi'
  }
});


const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res)=>{
	res.send('pog');
})



app.post('/tasks', (req, res)=>{

 const {id} = req.body;
  db.select()
  .where({theme_id: id})
    .table('task')
    .then(data => res.send(data)) 
})

app.get('/themes', (req,res) => {

  db.select()
    .table('theme')
    .then(data => res.send(data))
})

app.post('/taskcorr', (req, res) => {
  if(!req.body.email)return res.json('annony')
  db('user')
    .returning('tasks_completed')
    .where('email', '=', req.body.email)
    .increment('tasks_completed', 1)
  .then(response=> res.json(response[0].tasks_completed))
  .catch(err => res.status(400).json(err))
})

app.post('/signin', (req, res)=> {
  const { email, password, } = req.body;
  if(!email||!password){return res.json("cants")}
  db.select('email','hash').from('login')
  .where('email', '=', email)
  .then(data => {
  if(!data[0]){return res.json("fail")}
  const status = bcrypt.compareSync(password, data[0].hash)
  if(status){
    db.select('email', 'username', 'tasks_added', 'tasks_completed').from('user')
    .where('email', '=', email) 
    .then(response=>res.json(response[0]))
  }
  else if(!status){
      res.json('fail')
    }
  })
  .catch(err=> res.json(err + "aa"))
})



app.post('/register', (req, res)=> {
  const { email, password, username } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  db('login').returning('email').insert({
    email: email,
    hash: hash
  })
  .then(response => {
      db('user').returning('email').insert({
        email: email,
        username: username,
        creation_date: new Date()
      })
      .then(response=>res.json(response[0]))
      .catch(err=> res.json("cant"))
  })
  .catch(err=> res.json("cant"))
})


app.post('/addt', (req, res) =>{

  const {name, text, answer, theme, email} = req.body;

  if(!name || !text ||!answer || !theme || !email){
    return res.status(400).json('can dod this boss')
  }

  db('task').returning('task_id').insert({
       task_name: name,
       task_text:text,
       task_answer:answer,
       theme_id: theme,
       user_email:email }
    )
  .then(
    db('user')
      .returning('tasks_added')
      .where('email', '=', email)
    .increment('tasks_added', 1)
    .then(response=> res.json(response[0]))
    )
  
  .catch(err => res.status(400).json("this is the error : " + err));
})

app.listen(3000, ()=> {
  console.log('Runnng on port 3000')
})