const handleRegister = (req, res, db, bcrypt) => {
    
  const { password, username } = req.body;
  let { email } = req.body;
  if(!email || !username || !password) return res.status(400).json('incorrect submition')
	
  const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  const emailRegex = new RegExp('[^@]+@[^@]+.[^@]+')
  
  if(!passwordRegex.test(password)) return res.status(400).json('buddy this is not legally2')
  if(!emailRegex.test(email)) return res.status(400).json('buddy this is not legally')

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  db.transaction(trx => {
    trx.insert({
      email: email,
      hash: hash
    })
    .into('login')
    .returning('email')
    .then(emails=>{ 
      return trx.insert({
          email: emails[0].email,
          username: username,
          creation_date: new Date()
        })
        .into('user')
        .returning('email')
        .then(response=>res.json(response[0]))
      })
    .then(trx.commit)
    .catch(trx.rollback)
  })
.catch(err=>res.json("cant"))
}

module.exports={
  handleRegister
}