
const handleTasks = (req, res, db) => {
    const {id} = req.body;
   db.select()
    .where({theme_id: id})
      .table('task')
        .orderBy([
          { column: 'task_level' }, 
          { column: 'task_id', order: 'asc' }
        ]) 
   .then(resp =>res.json(resp))
   .catch(err=> res.json(err))
};

const handleTaskPoint = (req, res, db)=> {
  const {email, task} = req.body;
    if(!email|| !task)return res.json('annony')

    db.transaction(trx=>{
      trx.insert({
        task_id:task,
        user_email:email
      })
      .into('completed')
      .returning('user_email')
      .then(emil=>{
        return trx.increment('tasks_completed', 1)
        .where('email', '=', email)
        .into('public.user')
          .returning('tasks_completed')
          .then(response=> res.json(response[0]))
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
  .catch(err => res.json("don"))
}

const handleTaskAdd = (req, res, db) => {

  const {name, text, answer, theme, email, level, info} = req.body;
  if(!name || !text ||!answer || !theme || !email|| !level){
    return res.status(400).json('cantnt dod this boss')
    }
  if(level>5||level<0)return res.json("mr pls use the valid difficulty ;)")

  db.transaction(trx=>{
    trx.insert({
        task_name: name,
        task_text:text,
        task_info: info,
        task_answer:answer,
        theme_id: theme,
        user_email:email,
        task_level: level 
      })
    .into('task')
    .returning('user_email')
    .then(emaill=>{
      return trx.increment('tasks_added', 1)
      .where('email', '=', emaill[0].user_email)
      .into('public.user')
        .returning('tasks_added')
        .then(response=> res.json(response[0]))
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json("nice adding invalid variables or " + err));
}
const handleCompl = (req, res, db) => {
  const {email} = req.body;
  
  if(!email)return res.json('annony')
  db.select('task_id')
    .where({user_email: email})
      .table('completed')
   .then(resp =>res.json(resp))
   .catch(err=> res.json(err))
}


module.exports = {
  handleTasks,
  handleTaskPoint,
  handleTaskAdd,
  handleCompl
};