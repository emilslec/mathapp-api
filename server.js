const express = require('express');
const knex = require('knex')
const cors = require('cors')


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

app.post('/addt', (req, res) =>{

  const {name, text, answer, theme} = req.body;

  if(!name || !text ||!answer || !theme){
    return res.status(400).json('can dod this boss')
  }

  db('task').returning('*').insert({
       task_name: name,
       task_text:text,
       task_answer:answer,
       theme_id: theme }
    )
  .then(response=> res.json(response[0]))
  .catch(err => res.status(400).json("this is the error : " + err));
})





app.listen(3000, ()=> {
  console.log('Runnng on port 3000')
})