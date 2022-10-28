const handleRegister = (req, res, db, bcrypt) => {
    
  const { email, password, username } = req.body;
  if(!email || !username || !password){
		return res.status(400).json('incorrect submition')
	}
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
      return trx('public.user')
        .returning('email')
        .insert({
          email: emails[0].email,
          username: username,
          creation_date: new Date()
        })
        .then(response=>res.json(response[0]))
      })
    .then(trx.commit)
    .catch(trx.rollback)
  })
.catch(err=>res.json(err))
}

module.exports={
    handleRegister
}