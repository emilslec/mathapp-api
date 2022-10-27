const handleThemes = (req, res, db) => {
  db.select()
    .table('theme')
    .then(data => res.send(data))
}

module.exports = {
    handleThemes
}