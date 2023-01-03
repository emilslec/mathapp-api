const handleThemes = (req, res, db) => {
  db.select()
    .table('theme')
    .then(data => res.send(data))
}

const handleAddTheme = (req, res, db) => {
  const {name, classs, key} = req.body;
  //if(!key==process.env.THEME_KEY) return res.json("not good do this")
  db('theme')
    .insert({
      theme_class: classs,
      theme_name: name
    })
    .returning('theme_id')
    .then(resp=>res.json(resp))
    .catch(err=>res.json(err))
}

module.exports = {
    handleThemes,
    handleAddTheme
}