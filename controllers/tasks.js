
const handleTasks = (req, res, db) => {
    const {id} = req.body;
 


   db.select()
    .where({theme_id: id})
    .table('task')
    .then(tasks=>{
      tasks.forEach(task => {
        const username = db.select('username').where({email: task.user_email}).table('user')
         return ({...task, user_email:username})        
      })
      .then(tasks=> res.json(tasks))
    })
    .catch(err=>res.json(err))
    
};

const handleTaskPoint = (req, res, db)=> {
    if(!req.body.email)return res.json('annony')
  db('user')
    .returning('tasks_completed')
    .where('email', '=', req.body.email)
    .increment('tasks_completed', 1)
  .then(response=> res.json(response[0].tasks_completed))
  .catch(err => res.status(400).json(err))
}

const handleTaskAdd = (req, res, db) => {

  const {name, text, answer, theme, email, level} = req.body;
  if(!name || !text ||!answer || !theme || !email|| !level){
    return res.status(400).json('can dod this boss')
  }

  db('task').returning('task_id').insert({
       task_name: name,
       task_text:text,
       task_answer:answer,
       theme_id: theme,
       user_email:email,
       task_level: level }
    )
  .then(
    db('user')
      .returning('tasks_added')
      .where('email', '=', email)
    .increment('tasks_added', 1)
    .then(response=> res.json(response[0]))
    )
  
  .catch(err => res.status(400).json("this is the error "));
}


module.exports = {
    handleTasks,
    handleTaskPoint,
    handleTaskAdd
};