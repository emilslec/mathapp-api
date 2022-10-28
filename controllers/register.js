const handleRegister = (req, res, db, bcrypt) => {
    
  const { email, password, username } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  db('login').returning('email').insert({
    email: email,
    hash: hash
  })
  .then(
      db('user').returning('email').insert({
        email: email,
        username: username,
        creation_date: new Date()
      })
  )
  .then(response=>res.json(response[0]))
  .catch( res.json("cant"))
}

module.exports={
    handleRegister
}