const handleSignin = (req, res, db, bcrypt) => {

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
        // .then(resp=>)
        .then(response=>res.json(response[0]))
      }
      else if(!status){
          res.json('fail')
        }
      })
    .catch(err=> res.json(err + "aa"))
}

module.exports = {
  handleSignin
}