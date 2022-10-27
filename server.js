const express = require('express');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const tasks = require('./controllers/tasks')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const themes = require('./controllers/themes')

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

app.get('/', (req, res)=> res.send('pog'))
app.post('/tasks',(req, res) => tasks.handleTasks(req, res, db))
app.get('/themes', (req,res) => themes.handleThemes(req, res, db))
app.post('/taskpoint', (req, res) => tasks.handleTaskPoint(req, res, db))
app.post('/signin', (req, res)=> signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res)=>register.handleRegister( req, res, db, bcrypt))
app.post('/addtask', (req, res) => tasks.handleTaskAdd(req, res, db))

app.listen(3000, ()=> {
  console.log('Runnng on port 3000')
})